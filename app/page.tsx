"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Gamepad2, MapPin, Menu as MenuIcon, Minus, Plus, Search, Star, X } from "lucide-react";

const menuItems = [
  { name: "Duckpin smash burger", category: "Burgery", note: "Soczysta wołowina, cheddar, pikle, autorski sos", price: "—", tag: "Bestseller", image: "photo-1568901346375-23c9450c58cd" },
  { name: "Crispy chicken burger", category: "Burgery", note: "Chrupiący kurczak, sałata, majo limonkowe", price: "—", tag: "", image: "photo-1606755962773-d324e0a13086" },
  { name: "Loaded fries", category: "Na start", note: "Złote frytki z dodatkami do dzielenia", price: "—", tag: "Do ekipy", image: "photo-1573080496219-bb080dd4f877" },
  { name: "Krążki cebulowe", category: "Na start", note: "Chrupiące, podawane z sosem", price: "—", tag: "", image: "photo-1639024471283-03518883512d" },
  { name: "Coś na ochłodę", category: "Drinki i napoje", note: "Zapytaj obsługę o aktualną kartę", price: "—", tag: "", image: "photo-1514362545857-3bc16c4c7d1b" },
  { name: "Słodki finał", category: "Na słodko", note: "Dopytaj o deser dnia", price: "—", tag: "", image: "photo-1563805042-7684c019e1cb" }
];
const categories = ["Wszystko", "Burgery", "Na start", "Drinki i napoje", "Na słodko"];
const gallery = [
  { title: "Dobre rzeczy przy stole", image: "photo-1555939594-58d7cb561ad1" },
  { title: "Nie tylko jedzenie", image: "photo-1511512578047-dfb367046420" },
  { title: "Wpadnij z ekipą", image: "photo-1528605248644-14dd04022da1" },
  { title: "Wieczór ma swój smak", image: "photo-1517248135467-4c7edcad34c4" },
  { title: "Jeszcze jedna runda", image: "photo-1540747913346-19e32dc3e97e" }
];
const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Wszystko");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const filtered = useMemo(() => menuItems.filter(item => (activeCategory === "Wszystko" || item.category === activeCategory) && (item.name + item.note + item.category).toLowerCase().includes(search.toLowerCase())), [activeCategory, search]);
  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };
  const faqs = [
    ["Gdzie znajdę Duckpin?", "Jesteśmy przy ul. Dąbrówki 15/2 w Gnieźnie."],
    ["Czy można wpaść tylko na gry?", "Duckpin to miejsce na wspólne spędzanie czasu. Szczegóły dostępnych atrakcji i rezerwacji najlepiej potwierdzić telefonicznie."],
    ["Czy mogę zamówić jedzenie na wynos?", "Według dostępnych informacji lokal oferuje zamówienia na wynos. Zadzwoń, aby potwierdzić aktualne menu i czas realizacji."],
    ["Jakie są ceny?", "Orientacyjny koszt wizyty to 20–40 zł na osobę. Ceny poszczególnych pozycji nie zostały potwierdzone, dlatego nie podajemy ich na stronie."]
  ];
  return <main>
    <div className="announcement"><span className="live-dot" /> GNIEZNO, UL. DĄBRÓWKI 15/2 <span className="announcement-sep">/</span> MIEJSCE, W KTÓRYM ZOSTAJESZ DŁUŻEJ <ArrowUpRight size={13}/></div>
    <header className="header">
      <a className="brand" href="#top" aria-label="Duckpin, strona główna"><span className="brand-mark">D<span>.</span></span><span className="brand-name">DUCKPIN<small>FOOD · GAMES · PEOPLE</small></span></a>
      <nav className={mobileOpen ? "nav nav-open" : "nav"} aria-label="Nawigacja główna">
        <button onClick={() => goTo("menu")}>Karta</button><button onClick={() => goTo("experience")}>Miejsce</button><button onClick={() => goTo("gallery")}>Galeria</button><button onClick={() => goTo("visit")}>Kontakt</button>
        <a className="nav-cta" href="tel:+48733133431">Zadzwoń <ArrowUpRight size={15}/></a>
      </nav>
      <button className="mobile-toggle" aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <MenuIcon/>}</button>
    </header>
    <section className="hero" id="top">
      <div className="hero-image" role="img" aria-label="Jedzenie i spotkanie przy stole" />
      <div className="hero-shade" />
      <div className="hero-content">
        <div className="eyebrow light"><span className="eyebrow-line"/> GOOD FOOD. GOOD GAMES. GOOD COMPANY.</div>
        <h1>Tu zaczyna się<br/>dobry <em>wieczór.</em></h1>
        <p>Wpadnij coś zjeść, zostań na rewanż. Duckpin to miejsce na spontaniczne spotkania, wspólną grę i czas, który leci trochę za szybko.</p>
        <div className="hero-actions"><button className="button button-acid" onClick={() => goTo("menu")}>Zobacz kartę <ArrowDownRight size={17}/></button><button className="button button-ghost" onClick={() => goTo("experience")}>Poznaj Duckpin <ArrowRight size={16}/></button></div>
        <div className="hero-foot"><span><MapPin size={14}/> GNIEZNO, POLSKA</span><span>52°32' N / 17°36' E</span></div>
      </div>
      <div className="hero-sticker"><span>YOUR<br/>NEXT<br/>FAVOURITE<br/><b>SPOT.</b></span><ArrowDownRight size={22}/></div>
      <div className="hero-index"><span>01</span><i/> 03</div>
    </section>
    <div className="ticker" aria-label="Duckpin: jedzenie, gry, ludzie"><div className="ticker-track">{Array.from({length:4},(_,i)=><span key={i}>DOBRE JEDZENIE <b>✳</b> DOBRA EKIPA <b>✳</b> JESZCZE JEDNA RUNDA <b>✳</b> DUCKPIN GNIEZNO <b>✳</b></span>)}</div></div>
    <section className="intro section-pad" id="experience">
      <div className="section-kicker"><span>01 / O MIEJSCU</span><span>MADE FOR YOUR PEOPLE</span></div>
      <div className="intro-grid"><h2>Nie trzeba<br/>okazji, żeby<br/><em>dobrze</em> spędzić czas.</h2><div className="intro-copy"><p className="lead">Czasem wystarczy dobry stół, coś pysznego i ekipa, która nie odpuszcza rewanżu.</p><p>Duckpin łączy jedzenie z atmosferą miejsca, w którym można zwolnić, pośmiać się i zrobić z normalnego wieczoru małe wydarzenie.</p><button className="text-link" onClick={() => goTo("gallery")}>Zobacz klimat miejsca <ArrowUpRight size={16}/></button><div className="rating-note"><div className="rating-stars"><Star fill="currentColor" size={15}/><strong>4,7</strong><span>/ 5</span></div><div><b>Ocena gości</b><small>53 opinie w Google</small></div></div></div></div>
      <div className="experience-strip"><div className="experience-photo" /><div className="experience-caption"><span>01 — GOOD TIMES, NO PLANS</span><p>Plan na dziś? <em>Po prostu wpaść.</em></p></div><div className="experience-number">D<span>.</span></div></div>
    </section>
    <section className="menu-section section-pad" id="menu">
      <div className="section-kicker"><span>02 / COŚ DOBREGO</span><span>THE FOOD EDIT</span></div>
      <div className="section-heading"><div><h2>Na dobry <em>początek.</em></h2><p>Coś na ząb, coś do podziału, coś jeszcze przed kolejną rundą.</p></div><span className="menu-note">KARTA ORIENTACYJNA<br/>AKTUALNE POZYCJE POTWIERDŹ NA MIEJSCU</span></div>
      <div className="menu-controls"><div className="tabs" role="tablist" aria-label="Kategorie karty">{categories.map(cat=><button key={cat} role="tab" aria-selected={activeCategory===cat} className={activeCategory===cat?"tab active":"tab"} onClick={()=>setActiveCategory(cat)}>{cat}</button>)}</div><label className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Szukaj w karcie…" aria-label="Szukaj w karcie"/>{search&&<button onClick={()=>setSearch("")} aria-label="Wyczyść wyszukiwanie"><X size={14}/></button>}</label></div>
      <div className="result-count">{filtered.length} {filtered.length===1?"POZYCJA":"POZYCJE"} <span> / {activeCategory.toUpperCase()}</span></div>
      <div className="menu-grid">{filtered.map((item,i)=><article className="menu-card" key={item.name}><div className="menu-card-image"><img src={photo(item.image,700)} alt={item.name} loading="lazy"/>{item.tag&&<span className="item-tag">{item.tag}</span>}<span className="item-index">0{i+1}</span></div><div className="menu-card-info"><div><span className="item-category">{item.category}</span><h3>{item.name}</h3><p>{item.note}</p></div><span className="price">{item.price}</span></div></article>)}</div>
      <p className="menu-disclaimer">Zdjęcia mają charakter ilustracyjny. Pozycje i ceny w przykładowej prezentacji nie stanowią potwierdzonej, aktualnej karty Duckpin.</p>
      <div className="menu-bottom"><span>MASZ OCHOTĘ NA WIĘCEJ?</span><a href="tel:+48733133431" className="text-link">Zapytaj o aktualną kartę <ArrowUpRight size={16}/></a></div>
    </section>
    <section className="manifesto"><div className="manifesto-image" /><div className="manifesto-content"><span className="section-kicker">03 / THE DUCKPIN STATE OF MIND</span><h2>Nie liczy się<br/>wynik. Liczy się<br/><em>rewanż.</em></h2><p>Na chwilę, na cały wieczór, na spontanie. Najlepsze wspomnienia rzadko są w planie.</p><button className="button button-acid" onClick={()=>goTo("visit")}>Zaplanuj wypad <ArrowUpRight size={16}/></button><span className="manifesto-scribble">PLAY<br/>YOUR<br/>WAY ↗</span></div></section>
    <section className="gallery-section section-pad" id="gallery"><div className="section-kicker"><span>04 / KADRY Z KLIMATU</span><span>A LITTLE LOOK AROUND</span></div><div className="section-heading"><div><h2>Dobry klimat<br/><em>zostaje na dłużej.</em></h2><p>Smaki, spotkania i wieczory, które proszą się o dogrywkę.</p></div><div className="gallery-arrows"><button aria-label="Poprzednie zdjęcie" onClick={()=>setLightbox(lightbox===null?gallery.length-1:(lightbox+gallery.length-1)%gallery.length)}><ChevronLeft/></button><button aria-label="Następne zdjęcie" onClick={()=>setLightbox(lightbox===null?0:(lightbox+1)%gallery.length)}><ChevronRight/></button></div></div><div className="gallery-grid">{gallery.map((item,i)=><button className={`gallery-item gallery-item-${i+1}`} key={item.title} onClick={()=>setLightbox(i)} aria-label={`Powiększ zdjęcie: ${item.title}`}><img src={photo(item.image,900)} alt={item.title} loading="lazy"/><span className="gallery-overlay"><span>0{i+1} / 0{gallery.length}</span><b>{item.title}</b><ArrowUpRight size={20}/></span></button>)}</div><p className="menu-disclaimer">Fotografie poglądowe, nie są dokumentacją lokalu.</p></section>
    <section className="faq-section section-pad"><div className="section-kicker"><span>05 / DOBRZE WIEDZIEĆ</span><span>THE QUICK ANSWERS</span></div><div className="faq-layout"><h2>Masz pytanie?<br/><em>Już gramy.</em></h2><div className="faq-list">{faqs.map(([q,a],i)=><div className={faqOpen===i?"faq-item faq-active":"faq-item"} key={q}><button aria-expanded={faqOpen===i} onClick={()=>setFaqOpen(faqOpen===i?null:i)}><span>{q}</span>{faqOpen===i?<Minus size={18}/>:<Plus size={18}/>}</button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></div></section>
    <section className="visit-section section-pad" id="visit"><div className="visit-copy"><div className="section-kicker"><span>06 / WPADAJ DO NAS</span><span>SEE YOU SOON</span></div><h2>Stół czeka.<br/><em>Ekipa też.</em></h2><p>Wiesz już, gdzie nas znaleźć. Zadzwoń, jeśli chcesz dopytać o dostępność atrakcji, aktualną kartę lub plan wizyty.</p><div className="visit-details"><div><MapPin/><span><b>Dąbrówki 15/2</b><small>62-200 Gniezno</small></span></div><div><Clock3/><span><b>Godziny otwarcia</b><small>Sprawdź aktualne godziny telefonicznie</small></span></div><div><Gamepad2/><span><b>Jedzenie · gry · spotkania</b><small>Na miejscu i na wynos</small></span></div></div><a className="button button-dark" href="tel:+48733133431">733 133 431 <ArrowUpRight size={16}/></a><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Duckpin%20Gniezno%20D%C4%85br%C3%B3wki%2015%2F2" target="_blank" rel="noreferrer">Otwórz mapę <ArrowUpRight size={15}/></a></div><div className="map-panel"><div className="map-grid-lines"/><div className="map-route route-one"/><div className="map-route route-two"/><div className="map-pin"><MapPin size={25}/></div><div className="map-label"><span>DUCKPIN / GNIEZNO</span><b>Dąbrówki 15/2</b><small>62-200 Gniezno, Polska</small></div><span className="map-coord">52°32' N<br/>17°36' E</span><a href="https://www.google.com/maps/search/?api=1&query=Duckpin%20Gniezno%20D%C4%85br%C3%B3wki%2015%2F2" target="_blank" rel="noreferrer" className="map-open">OTWÓRZ W MAPACH <ArrowUpRight size={14}/></a></div></section>
    <section className="final-cta"><span>GOOD FOOD. GOOD GAMES. GOOD PEOPLE.</span><h2>Do zobaczenia<br/><em>przy stole.</em></h2><button className="button button-acid" onClick={()=>goTo("visit")}>Znajdź Duckpin <ArrowUpRight size={16}/></button><span className="final-doodle">D.</span></section>
    <footer className="footer"><a className="brand brand-footer" href="#top"><span className="brand-mark">D<span>.</span></span><span className="brand-name">DUCKPIN<small>FOOD · GAMES · PEOPLE</small></span></a><span>GNIEZNO · DĄBRÓWKI 15/2</span><span>© DUCKPIN · DOBRZE, ŻE JESTEŚ</span><a href="/admin" className="back-top">PANEL WŁAŚCICIELA ↗</a><a href="#top" className="back-top">NA GÓRĘ ↑</a></footer>
    {lightbox!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria zdjęć" onClick={()=>setLightbox(null)} onKeyDown={e=>{if(e.key==="Escape")setLightbox(null);if(e.key==="ArrowRight")setLightbox((lightbox+1)%gallery.length);if(e.key==="ArrowLeft")setLightbox((lightbox+gallery.length-1)%gallery.length)}} tabIndex={0}><button className="lightbox-close" onClick={()=>setLightbox(null)} aria-label="Zamknij galerię"><X/></button><button className="lightbox-prev" aria-label="Poprzednie zdjęcie" onClick={e=>{e.stopPropagation();setLightbox((lightbox+gallery.length-1)%gallery.length)}}><ChevronLeft/></button><img src={photo(gallery[lightbox].image,1600)} alt={gallery[lightbox].title} onClick={e=>e.stopPropagation()}/><button className="lightbox-next" aria-label="Następne zdjęcie" onClick={e=>{e.stopPropagation();setLightbox((lightbox+1)%gallery.length)}}><ChevronRight/></button><div className="lightbox-caption">{gallery[lightbox].title} <span>0{lightbox+1} / 0{gallery.length}</span></div></div>}
  </main>;
}