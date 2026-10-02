'use client';

import { useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AI_PROVIDERS, SOCIAL_NETWORKS, buildReaderPrompt, publicShareUrl, socialShareUrl, type ReaderContext } from '@/lib/share';
import type { SeoDocument } from '@/lib/seo';

function ShareIcon({kind}:{kind:string}) {
  const base = {width:18,height:18,viewBox:'0 0 24 24','aria-hidden':true as const,focusable:false};
  if (kind === 'twitter') return <svg {...base} fill="currentColor"><path d="M18.9 2h3.2l-7 8 8.3 12h-6.5l-5.1-7.5L5.2 22H2l7.5-8.6L1.6 2h6.6l4.6 6.9L18.9 2Zm-1.1 18h1.8L7.2 3.9H5.3L17.8 20Z" /></svg>;
  if (kind === 'facebook') return <svg {...base} fill="currentColor"><path d="M14.6 22v-9.1h3.1l.5-3.5h-3.6V7.2c0-1 .3-1.7 1.8-1.7h1.9V2.3c-.3 0-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9v2.4H7.6v3.5h3.2V22h3.8Z" /></svg>;
  if (kind === 'bluesky') return <svg {...base} fill="currentColor"><path d="M5 3.5C7.9 5.7 11 10 12 12c1-2 4.1-6.3 7-8.5 2.1-1.6 5-2.8 5 1.2 0 .8-.5 6.7-.8 7.7-1.1 3.5-5.2 4.4-8.8 3.8 6.3 1.1 7.9 4.7 4.4 8.3-6.6 6.7-9.5-1.7-10.2-3.7-.7 2-3.6 10.4-10.2 3.7-3.5-3.6-1.9-7.2 4.4-8.3-3.6.6-7.7-.3-8.8-3.8C.5 11.4 0 5.5 0 4.7c0-4 2.9-2.8 5-1.2Z" transform="translate(2 0) scale(.8)" /></svg>;
  if (kind === 'reddit') return <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><ellipse cx="12" cy="15" rx="8" ry="5" /><circle cx="9" cy="14" r="1" fill="currentColor" /><circle cx="15" cy="14" r="1" fill="currentColor" /><path d="M9 17q3 2 6 0M12 10l1-6 4 1M4 12c-4-4-6 3 0 3m16-3c4-4 6 3 0 3" /><circle cx="19" cy="5" r="2" /></svg>;
  if (kind === 'copy') return <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>;
  return <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z" /></svg>;
}

function readerContext(): ReaderContext {
  const main = document.querySelector('main');
  if (!main) return {};
  const visible = (element: Element) => !element.closest('[data-share-tools],details:not([open])') && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden';
  const blocks = [...main.querySelectorAll<HTMLElement>('h1,h2,h3,p,blockquote,table,dt,dd')].filter(visible);
  const excerpt = [...new Set(blocks.map(element=>element.innerText.trim()).filter(Boolean))].join('\n\n').slice(0,6000);
  const filters = [...main.querySelectorAll<HTMLInputElement | HTMLSelectElement>('select,input[type="search"],input[type="text"],input[type="checkbox"]:checked')]
    .filter(visible).map(element => {
      const value = element instanceof HTMLSelectElement ? [...element.selectedOptions].map(option=>option.text).join(', ') : element.value;
      const label = element.getAttribute('aria-label') ?? element.labels?.[0]?.innerText.split('\n')[0] ?? element.name;
      return value ? `${label}: ${value}` : '';
    }).filter(Boolean).slice(0,20);
  const sources = [...main.querySelectorAll<HTMLAnchorElement>('a[href]')].filter(visible)
    .filter(anchor=>anchor.href.startsWith('https://') && new URL(anchor.href).hostname !== 'preuve-publique.fr' && !anchor.href.includes('.run.app'))
    .map(anchor=>anchor.href).slice(0,8);
  const section = blocks.find(element=>/^H[23]$/.test(element.tagName) && element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().top < window.innerHeight)?.innerText;
  return {excerpt,filters,sources,section,selection:window.getSelection()?.toString().trim()};
}

async function writeClipboard(text: string) {
  if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      navigator.clipboard.writeText(text),
      new Promise<never>((_,reject)=>{ timeout=setTimeout(()=>reject(new Error('Clipboard timeout')),2500); }),
    ]);
  } finally { if (timeout) clearTimeout(timeout); }
}

export function ShareTools({path,document:page}:{path:string;document:SeoDocument}) {
  const pathname = usePathname();
  const search = useSearchParams();
  const url = publicShareUrl(pathname ?? path, search.toString());
  const dialog = useRef<HTMLDialogElement>(null);
  const [message,setMessage] = useState('');
  const [manualLink,setManualLink] = useState('');
  const [prompt,setPrompt] = useState('');
  const [providerId,setProviderId] = useState('');
  const [promptMessage,setPromptMessage] = useState('');
  const [copying,setCopying] = useState(false);
  const provider = AI_PROVIDERS.find(item=>item.id === providerId);
  const currentUrl = () => publicShareUrl(window.location.pathname,window.location.search,window.location.hash);

  async function copyLink() {
    const link = currentUrl();
    try {
      await writeClipboard(link);
      setManualLink(''); setMessage('Lien copié.');
    } catch { setManualLink(link); setMessage('Sélectionnez le lien ci-dessous pour le copier.'); }
  }

  async function copyPrompt(text = prompt) {
    setCopying(true);
    setPromptMessage('Copie du prompt…');
    try {
      await writeClipboard(text);
      setPromptMessage('Prompt copié. Ouvrez votre IA, puis collez-le dans une nouvelle conversation.');
    } catch { setPromptMessage('La copie automatique est indisponible. Sélectionnez le prompt ci-dessous et copiez-le.'); }
    finally { setCopying(false); }
  }

  function openAi() {
    setPrompt(buildReaderPrompt(page,currentUrl(),readerContext()));
    setProviderId(''); setPromptMessage('');
    dialog.current?.showModal();
  }

  return <aside className="share-tools" data-share-tools aria-label="Partager cette page">
    <div className="share-tools-row"><span className="share-label">Partager</span>
      {SOCIAL_NETWORKS.map(network=><a key={network.id} className="share-control" href={socialShareUrl(network.id,url,page.title)} onClick={event=>{event.currentTarget.href=socialShareUrl(network.id,currentUrl(),page.title);}} target="_blank" rel="noopener noreferrer nofollow" aria-label={`Partager sur ${network.label}`} title={`Partager sur ${network.label}`}><ShareIcon kind={network.id} /><span className="share-network-name">{network.label}</span></a>)}
      <button type="button" className="share-control" onClick={copyLink} title="Copier le lien" aria-label="Copier le lien"><ShareIcon kind="copy" /><span className="share-network-name">Copier le lien</span></button>
      <button type="button" className="share-control share-ai" onClick={openAi} aria-haspopup="dialog"><ShareIcon kind="ai" /><span>Envoyer à une IA</span></button>
    </div>
    <span className="share-feedback" role="status">{message}</span>
    {manualLink ? <input className="share-manual-link" readOnly value={manualLink} aria-label="Lien à copier manuellement" onFocus={event=>event.currentTarget.select()} /> : null}
    <dialog ref={dialog} className="share-ai-dialog" aria-labelledby="share-ai-title">
      <div className="share-dialog-heading"><div><span className="eyebrow">Comprendre avec les sources</span><h2 id="share-ai-title">Envoyer à une IA</h2></div><button type="button" className="share-dialog-close" onClick={()=>dialog.current?.close()} aria-label="Fermer le sélecteur d’IA">×</button></div>
      <p>Choisissez une IA pour copier le prompt préparé à partir de cette page, de ses filtres et du contenu affiché. Vous pouvez le modifier avant de le coller.</p>
      <label className="share-ai-provider">Choisir une IA<select value={providerId} disabled={copying} onChange={event=>{setProviderId(event.target.value); void copyPrompt();}}><option value="" disabled>Choisir une IA…</option>{AI_PROVIDERS.map(item=><option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
      <label className="share-prompt-label" htmlFor="share-ai-prompt">Prompt à copier</label>
      <textarea id="share-ai-prompt" value={prompt} onChange={event=>setPrompt(event.target.value)} spellCheck={false} rows={9} />
      <p className="share-dialog-feedback" role="status">{promptMessage}</p>
      <div className="share-dialog-actions"><button type="button" className="button secondary" disabled={copying} onClick={()=>void copyPrompt()}><ShareIcon kind="copy" />{copying?'Copie…':'Copier le prompt'}</button>{provider ? <a className="button" href={provider.url} target="_blank" rel="noopener noreferrer nofollow">Ouvrir {provider.name} ↗</a> : null}</div>
      <p className="hint">Le prompt est copié sur votre appareil. Collez-le dans l’IA choisie pour lancer la conversation.</p>
    </dialog>
  </aside>;
}
