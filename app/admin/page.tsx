"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Check, ExternalLink, ImagePlus, LayoutDashboard, LogOut, Menu as MenuIcon, Pencil, Plus, Save, Settings, Trash2, Utensils, X } from "lucide-react";
import Link from "next/link";
import "./admin.css";

type Dish = { id: string; name: string; category: string; description: string; price: string; image: string };
type Photo = { id: string; title: string; src: string };
type Copy = { headline: string; intro: string; phone: string; address: string };
const defaultDishes: Dish[] = [
  { id: "1", name: "Duckpin smash burger", category: "Burgery", description: "Soczysta wołowina, cheddar, pikle, autorski sos", price: "" },
  { id: "2", name: "Crispy chicken burger", category: "Burgery", description: "Chrupiący kurczak i majo limonkowe", price: "" },
  { id: "3", name: "Loaded fries", category: "Na start", description: "Frytki z dodatkami do dzielenia", price: "" }
];
const defaultCopy: Copy = { headline: "Tu zaczyna się dobry wieczór.", intro: "Jedzenie, gry i czas spędzony z ekipą.", phone: "733 133 431", address: "Dąbrówki 15/2, 62-200 Gniezno" };
const nav = [
  { id: "dashboard", label: "Pulpit", icon: LayoutDashboard },
  { id: "gallery", label: "Galeria", icon: ImagePlus },
  { id: "menu", label: "Karta", icon: Utensils },
  { id: "content", label: "Treści strony", icon: Pencil },
  { id: "settings", label: "Ustawienia", icon: Settings }
];
const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const raw = localStorage.getItem("duckpin-admin-" + key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
};
const persist = (key: string, value: unknown) => localStorage.setItem("duckpin-admin-" + key, JSON.stringify(value));
export default function AdminPage() {
  const [section, setSection] = useState("dashboard");
  const [dishes, setDishes] = useState<Dish[]>(defaultDishes);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [copy, setCopy] = useState<Copy>(defaultCopy);
  const [notice, setNotice] = useState("");
  const [dishForm, setDishForm] = useState<Dish | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setDishes(read("dishes", defaultDishes)); setPhotos(read("photos", [])); setCopy(read("copy", defaultCopy)); }, []);
  const categories = useMemo(() => Array.from(new Set(dishes.map(d => d.category).filter(Boolean))), [dishes]);
  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2800); };
  const saveDishes = (next: Dish[]) => { setDishes(next); persist("dishes", next); flash("Karta została zapisana."); };
  const savePhotos = (next: Photo[]) => { setPhotos(next); persist("photos", next); flash("Galeria została zaktualizowana."); };
  const saveCopy = () => { persist("copy", copy); flash("Treści zostały zapisane."); };
  const addPhoto = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { flash("Wybierz plik graficzny."); return; }
    if (file.size > 8 * 1024 * 1024) { flash("Zdjęcie musi mieć mniej niż 8 MB."); return; }
    const src = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(); reader.onerror = reject; reader.readAsDataURL(file);
    }).catch(() => "");
    if (!src) { flash("Nie udało się odczytać zdjęcia."); return; }
    const next = [...photos, { id: crypto.randomUUID(), title: photoTitle.trim() || file.name.replace(/\.[^.]+$/, ""), src }];
    try { persist("photos", next); setPhotos(next); setPhotoTitle(""); flash("Zdjęcie dodane."); }
    catch { flash("Brak miejsca w pamięci przeglądarki. Wersja demonstracyjna nie zastępuje storage."); }
  };
  const movePhoto = (index: number, direction: -1 | 1) => {
    const target = index + direction; if (target < 0 || target >= photos.length) return;
    const next = [...photos]; [next[index], next[target]] = [next[target], next[index]]; savePhotos(next);
  };
  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <Link className="admin-brand" href="/"><span className="admin-brand-mark">D<span>.</span></span><span>DUCKPIN<small>FOOD · GAMES · PEOPLE</small></span></Link>
      <div className="admin-side-label">ZARZĄDZANIE</div>
      <nav aria-label="Nawigacja panelu">{nav.map(item => { const Icon = item.icon; return <button key={item.id} className={section === item.id ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setSection(item.id)}><Icon size={17}/>{item.label}{section === item.id && <span className="admin-nav-mark"/>}</button>; })}</nav>
      <div className="admin-sidebar-bottom"><span className="admin-status-dot"/> TRYB DEMONSTRACYJNY <Link href="/" className="admin-back"><ArrowLeft size={15}/> Wróć na stronę</Link></div>
    </aside>
    <section className="admin-main">
      <header className="admin-topbar"><div><span className="admin-overline">DUCKPIN / PANEL WŁAŚCICIELA</span><h1>{nav.find(n => n.id === section)?.label}</h1></div><Link href="/" className="admin-view-site">Zobacz stronę <ExternalLink size={15}/></Link></header>
      {notice && <div className="admin-toast" role="status"><Check size={16}/>{notice}<button onClick={() => setNotice("")} aria-label="Zamknij komunikat"><X size={14}/></button></div>}
      {section === "dashboard" && <div className="admin-content">
        <div className="admin-welcome"><div><span className="admin-overline">MIŁO CIĘ WIDZIEĆ</span><h2>Hej, Duckpin<span>.</span></h2><p>Twoje miejsce, Twoje treści. Zarządzaj nimi w jednym miejscu.</p></div><div className="admin-welcome-icon">D.</div></div>
        <div className="admin-stats"><article><span>POZYCJE KARTY</span><strong>{dishes.length.toString().padStart(2, "0")}</strong><small>Wersja lokalna</small></article><article><span>ZDJĘCIA W GALERII</span><strong>{photos.length.toString().padStart(2, "0")}</strong><small>Dodane w tym panelu</small></article><article><span>SEKCJE DO EDYCJI</span><strong>03</strong><small>Karta, galeria, treści</small></article></div>
        <div className="admin-section-heading"><div><span className="admin-overline">SZYBKIE DZIAŁANIA</span><h3>Od czego zaczynamy?</h3></div></div>
        <div className="admin-quick-grid"><button onClick={() => {setSection("menu");setDishForm({id:crypto.randomUUID(),name:"",category:categories[0]||"Burgery",description:"",price:""});}}><Utensils/><span><b>Edytuj kartę</b><small>Dodawaj pozycje i aktualizuj opisy</small></span><ArrowLeft className="admin-quick-arrow"/></button><button onClick={() => setSection("gallery")}><ImagePlus/><span><b>Uzupełnij galerię</b><small>Dodaj zdjęcia i ustaw kolejność</small></span><ArrowLeft className="admin-quick-arrow"/></button><button onClick={() => setSection("content")}><Pencil/><span><b>Zmień treści</b><small>Edytuj nagłówek i dane kontaktowe</small></span><ArrowLeft className="admin-quick-arrow"/></button></div>
        <div className="admin-demo-note"><Settings size={18}/><p><b>Ważne: panel demonstracyjny</b><br/>Zmiany są przechowywane tylko w tej przeglądarce. Przed publikacją potrzebne są konto właściciela, serwerowa autoryzacja oraz baza danych i storage.</p></div>
      </div>}
      {section === "menu" && <div className="admin-content"><div className="admin-section-heading"><div><span className="admin-overline">OFERTA / MENU</span><h3>Pozycje karty</h3><p>Nie wpisuj cen, dopóki nie są potwierdzone.</p></div><button className="admin-primary" onClick={() => setDishForm({id:crypto.randomUUID(),name:"",category:categories[0]||"Burgery",description:"",price:""})}><Plus size={16}/> Dodaj pozycję</button></div>
        {dishForm && <form className="admin-form admin-dish-form" onSubmit={e=>{e.preventDefault();const next=dishes.some(d=>d.id===dishForm.id)?dishes.map(d=>d.id===dishForm.id?dishForm:d):[...dishes,dishForm];saveDishes(next);setDishForm(null);}}><div className="admin-form-title"><b>{dishes.some(d=>d.id===dishForm.id)?"Edytuj pozycję":"Nowa pozycja"}</b><button type="button" className="admin-icon-button" onClick={()=>setDishForm(null)} aria-label="Zamknij"><X size={17}/></button></div><label>Nazwa<input required value={dishForm.name} onChange={e=>setDishForm({...dishForm,name:e.target.value})} placeholder="Nazwa pozycji"/></label><div className="admin-form-row"><label>Kategoria<input required value={dishForm.category} onChange={e=>setDishForm({...dishForm,category:e.target.value})} placeholder="np. Burgery"/></label><label>Cena<input value={dishForm.price} onChange={e=>setDishForm({...dishForm,price:e.target.value})} placeholder="Pozostaw puste, jeśli niepotwierdzona"/></label></div><label>Opis<textarea rows={3} value={dishForm.description} onChange={e=>setDishForm({...dishForm,description:e.target.value})} placeholder="Krótki opis"/></label><div className="admin-form-actions"><button type="button" className="admin-secondary" onClick={()=>setDishForm(null)}>Anuluj</button><button className="admin-primary" type="submit"><Save size={15}/> Zapisz pozycję</button></div></form>}
        <div className="admin-list">{dishes.map((dish,index)=><article className="admin-list-row" key={dish.id}><span className="admin-row-index">{String(index+1).padStart(2,"0")}</span><div className="admin-row-main"><b>{dish.name}</b><small>{dish.category} · {dish.description || "Brak opisu"}</small></div><span className="admin-row-price">{dish.price || "Cena nieustalona"}</span><button className="admin-icon-button" onClick={()=>setDishForm({...dish})} aria-label={"Edytuj "+dish.name}><Pencil size={16}/></button><button className="admin-icon-button danger" onClick={()=>{if(window.confirm("Usunąć pozycję „"+dish.name+"”?"))saveDishes(dishes.filter(d=>d.id!==dish.id));}} aria-label={"Usuń "+dish.name}><Trash2 size={16}/></button></article>)}</div>
      </div>}
      {section === "gallery" && <div className="admin-content"><div className="admin-section-heading"><div><span className="admin-overline">FOTOGRAFIE / GALERIA</span><h3>Zdjęcia, które robią klimat</h3><p>Dodaj zdjęcia, podpisz je i zmień kolejność strzałkami.</p></div></div><div className="admin-upload-panel"><ImagePlus size={22}/><div><b>Dodaj zdjęcia do galerii</b><p>JPG, PNG lub WebP. Maksymalnie 8 MB na plik w wersji demo.</p><div className="admin-upload-controls"><input value={photoTitle} onChange={e=>setPhotoTitle(e.target.value)} placeholder="Podpis zdjęcia (opcjonalnie)" aria-label="Podpis zdjęcia"/><button className="admin-primary" onClick={()=>fileRef.current?.click()}><Plus size={16}/> Wybierz zdjęcie</button><input ref={fileRef} hidden type="file" accept="image/*" onChange={e=>{void addPhoto(e.target.files?.[0]);e.currentTarget.value="";}}/></div></div></div>
        {photos.length===0?<div className="admin-empty"><ImagePlus size={28}/><b>Galeria jest jeszcze pusta</b><p>Dodane fotografie pojawią się tutaj. W wersji demonstracyjnej są zapisywane lokalnie.</p></div>:<div className="admin-photo-grid">{photos.map((photo,index)=><article key={photo.id} className="admin-photo-card"><img src={photo.src} alt={photo.title}/><div className="admin-photo-info"><b>{photo.title}</b><span>#{String(index+1).padStart(2,"0")}</span></div><div className="admin-photo-actions"><button className="admin-icon-button" disabled={index===0} onClick={()=>movePhoto(index,-1)} aria-label="Przesuń zdjęcie w górę"><ArrowUp size={16}/></button><button className="admin-icon-button" disabled={index===photos.length-1} onClick={()=>movePhoto(index,1)} aria-label="Przesuń zdjęcie w dół"><ArrowDown size={16}/></button><button className="admin-icon-button danger" onClick={()=>{if(window.confirm("Usunąć to zdjęcie z galerii?"))savePhotos(photos.filter(p=>p.id!==photo.id));}} aria-label="Usuń zdjęcie"><Trash2 size={16}/></button></div></article>)}</div>}
      </div>}
      {section === "content" && <div className="admin-content"><div className="admin-section-heading"><div><span className="admin-overline">TREŚCI / STRONA GŁÓWNA</span><h3>Słowa, które mówią o Duckpin</h3><p>Edytuj treści i dane kontaktowe. Zapis pozostaje lokalny w tym demo.</p></div></div><form className="admin-form" onSubmit={e=>{e.preventDefault();saveCopy();}}><label>Główny nagłówek<input required value={copy.headline} onChange={e=>setCopy({...copy,headline:e.target.value})}/></label><label>Krótki opis<textarea rows={4} value={copy.intro} onChange={e=>setCopy({...copy,intro:e.target.value})}/></label><div className="admin-form-row"><label>Telefon<input value={copy.phone} onChange={e=>setCopy({...copy,phone:e.target.value})}/></label><label>Adres<input value={copy.address} onChange={e=>setCopy({...copy,address:e.target.value})}/></label></div><div className="admin-form-actions"><button className="admin-primary" type="submit"><Save size={15}/> Zapisz treści</button></div></form><div className="admin-preview"><span className="admin-overline">PODGLĄD TREŚCI</span><h3>{copy.headline}</h3><p>{copy.intro}</p><small>{copy.phone} · {copy.address}</small></div></div>}
      {section === "settings" && <div className="admin-content"><div className="admin-section-heading"><div><span className="admin-overline">USTAWIENIA / DANE</span><h3>Ustawienia panelu</h3><p>Ten panel jest demonstracją edycji w przeglądarce, a nie zabezpieczonym panelem produkcyjnym.</p></div></div><div className="admin-demo-note"><Settings size={18}/><p><b>Brak logowania produkcyjnego</b><br/>Nie publikuj panelu z danymi prywatnymi. Przed wdrożeniem należy podłączyć serwerową autoryzację, bazę danych i storage, na przykład Supabase, oraz sprawdzić uprawnienia każdej operacji.</p></div><button className="admin-secondary admin-reset" onClick={()=>{if(window.confirm("Usunąć lokalne zmiany panelu i przywrócić dane demonstracyjne?")){localStorage.removeItem("duckpin-admin-dishes");localStorage.removeItem("duckpin-admin-photos");localStorage.removeItem("duckpin-admin-copy");setDishes(defaultDishes);setPhotos([]);setCopy(defaultCopy);flash("Przywrócono dane demonstracyjne.");}}}><Trash2 size={16}/> Przywróć dane demonstracyjne</button></div>}
      <footer className="admin-footer"><span>DUCKPIN / OWNER SPACE</span><span>JEDEN MOTYW. JEDNO MIEJSCE.</span></footer>
    </section>
  </main>;
}
