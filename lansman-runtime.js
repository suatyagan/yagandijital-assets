(() => {
  const root = document.getElementById('launch-root');
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const querySlug = new URLSearchParams(window.location.search).get('launch');
  const pathSlug = pathname.startsWith('/lansman/') ? pathname.slice('/lansman/'.length) : '';
  const slug = (querySlug || pathSlug || '').trim();

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const trDate = value => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('tr-TR',{day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(d);
  };
  const isPast = data => {
    const t = new Date(data.launchDate).getTime();
    return Number.isFinite(t) && Date.now() > t + 12 * 60 * 60 * 1000;
  };
  const contactHref = data => data.contactEmail
    ? 'mailto:' + encodeURIComponent(data.contactEmail) + '?subject=' + encodeURIComponent((data.brand || 'Dijital Lansman') + ' · Bilgi / İletişim')
    : 'https://wa.me/905378875447?text=' + encodeURIComponent('Merhaba, ' + (data.brand || 'Dijital Lansman') + ' hakkında bilgi almak istiyorum.');

  function renderError(message) {
    root.innerHTML = '<div class="launch-error"><h1>Lansman bulunamadı.</h1><p>' + esc(message) + '</p><a class="btn secondary" href="/urunler/dijital-lansman">Dijital Lansman ürününü incele →</a></div>';
  }

  function render(data) {
    const completed = isPast(data) || data.status === 'completed';
    const status = completed ? 'TAMAMLANDI' : data.status === 'live' ? 'CANLI' : 'ÖN LANSMAN';
    const modules = Array.isArray(data.modules) ? data.modules : [];
    root.innerHTML = `
      <header class="launch-top">
        <div class="launch-brand"><strong>${esc(data.brand)}</strong><span>${esc(data.name || 'Dijital Lansman')}</span></div>
        <span class="launch-status ${completed ? 'completed' : ''}">${status}</span>
      </header>
      <main>
        <section class="launch-hero">
          <div>
            <span class="launch-eyebrow">${esc(data.eyebrow || data.brand)}</span>
            <h1>${esc(data.title)}</h1>
            <p>${esc(completed ? (data.completedMessage || 'Etkinlik tamamlandı. Lansman içeriğini ve iletişim bilgilerini inceleyebilirsiniz.') : data.subtitle)}</p>
            <div class="launch-actions">
              <a class="btn primary" href="#iletisim">${esc(completed ? 'Bilgi Al' : (data.cta || 'LCV / Bilgi Al'))} →</a>
              <button class="btn secondary" id="share-launch" type="button">Bağlantıyı Paylaş</button>
            </div>
          </div>
          <div class="launch-stage">
            <div class="stage-plane">✈</div><div class="stage-train"></div>
            <div class="stage-copy"><strong>${esc(data.stageTitle || data.title)}</strong><span>${esc(data.stageSubtitle || 'Dijital Lansman · Powered by Yağan Dijital')}</span></div>
          </div>
        </section>
        <section class="launch-meta">
          <div><span>Mekan & Organizasyon</span><strong>${esc(data.venuePartner || '—')}</strong></div>
          <div><span>Dijital Lansman Teknolojisi</span><strong>${esc(data.technologyProvider ? 'Powered by ' + data.technologyProvider : 'Powered by Yağan Dijital')}</strong></div>
          <div><span>Yer</span><strong>${esc(data.eventLocation || '—')}</strong></div>
          <div><span>Program</span><strong>${esc(data.programNote || trDate(data.launchDate) || '—')}</strong>${data.contactEmail ? '<small>LCV: ' + esc(data.contactEmail) + '</small>' : ''}</div>
        </section>
        <section id="countdown" class="launch-countdown ${completed ? 'hidden' : ''}">
          <div class="intro">Lansmana kalan süre</div>
          <div class="time"><strong id="cd-day">00</strong><span>GÜN</span></div>
          <div class="time"><strong id="cd-hour">00</strong><span>SAAT</span></div>
          <div class="time"><strong id="cd-min">00</strong><span>DAKİKA</span></div>
          <div class="time"><strong id="cd-sec">00</strong><span>SANİYE</span></div>
        </section>
        <section class="launch-story">
          <span class="launch-eyebrow">${esc(data.storyKicker || 'LANSMAN')}</span>
          <h2>${esc(data.storyTitle || data.title)}</h2>
          <p>${esc(data.storyText || data.subtitle)}</p>
          <div class="launch-grid">${modules.map((m,i)=>'<article class="launch-card"><b>'+esc(m.code || String(i+1).padStart(2,'0'))+'</b><h3>'+esc(m.title)+'</h3><p>'+esc(m.text)+'</p></article>').join('')}</div>
        </section>
        <section class="launch-contact" id="iletisim">
          <span class="launch-eyebrow">${completed ? 'ETKİNLİK SONRASI İLETİŞİM' : 'LCV / İLETİŞİM'}</span>
          <h2>${esc(completed ? 'Bilgi ve iletişim talebinizi iletin.' : 'Etkinlik için iletişime geçin.')}</h2>
          <p>${esc(data.contactText || 'Etkinlik ve lansman hakkında bilgi almak için iletişim kanalını kullanabilirsiniz.')}</p>
          <a class="btn primary" href="${contactHref(data)}">${data.contactEmail ? 'E-posta ile İletişim' : 'WhatsApp ile Bilgi Al'} →</a>
        </section>
      </main>
      <footer class="launch-footer"><div><strong>${esc(data.brand)}</strong><span> · ${esc(data.name || 'Dijital Lansman')}</span></div><div>Powered by Yağan Dijital · Production</div></footer>`;

    document.title = (data.brand || 'Dijital Lansman') + ' | Dijital Lansman';
    const shareButton = document.getElementById('share-launch');
    shareButton?.addEventListener('click', async () => {
      try {
        if (navigator.share) await navigator.share({title: document.title, url: window.location.href});
        else { await navigator.clipboard.writeText(window.location.href); shareButton.textContent = 'Bağlantı Kopyalandı'; }
      } catch {}
    });

    if (!completed) {
      const target = new Date(data.launchDate).getTime();
      const tick = () => {
        const diff = Math.max(0,target-Date.now());
        const days = Math.floor(diff/86400000);
        const hours = Math.floor((diff%86400000)/3600000);
        const mins = Math.floor((diff%3600000)/60000);
        const secs = Math.floor((diff%60000)/1000);
        const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=String(v).padStart(2,'0')};
        set('cd-day',days);set('cd-hour',hours);set('cd-min',mins);set('cd-sec',secs);
        if (diff <= 0) document.getElementById('countdown')?.classList.add('hidden');
      };
      tick(); setInterval(tick,1000);
    }
  }

  if (!slug) { renderError('Geçerli bir lansman adresi belirtilmedi.'); return; }
  fetch('/lansman-data/' + encodeURIComponent(slug) + '.json', {cache:'no-store'})
    .then(r => { if (!r.ok) throw new Error('Lansman kaydı bulunamadı.'); return r.json(); })
    .then(render)
    .catch(err => renderError(err.message || 'Lansman içeriği yüklenemedi.'));
})();