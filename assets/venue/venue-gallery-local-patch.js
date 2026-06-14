(function(){
  var LOCAL_VENUE_PHOTOS = [
    {
      title: 'Courtyard',
      caption: 'Open-air courtyard with mural-wall seating and French Quarter atmosphere.',
      src: 'assets/venue/courtyard-fullres.jpg?v=20260613'
    },
    {
      title: 'Speakeasy Back Bar',
      caption: 'Warm backbar glow, intimate room energy, and neighborhood-night feel.',
      src: 'assets/venue/speakeasy-back-bar-fullres.jpg?v=20260613'
    },
    {
      title: 'Main Stage',
      caption: 'Live music room with stage lighting, crowd energy, and classic BMC atmosphere.',
      src: 'assets/venue/main-stage-fullres.jpg?v=20260613'
    },
    {
      title: 'Seasonal Balcony Bar',
      caption: 'Seasonally open balcony bar with French Quarter balcony atmosphere.',
      src: 'assets/venue/seasonal-balcony-bar-fullres.jpg?v=20260613'
    }
  ];

  function esc(value){
    return String(value || '').replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function renderVenueGallery(){
    window.BMC_VENUE_PHOTOS = LOCAL_VENUE_PHOTOS.slice();
    var root = document.getElementById('spaces');
    if(!root) return;
    root.innerHTML = LOCAL_VENUE_PHOTOS.map(function(photo){
      return '<article class="venue-photo-card"><img src="'+esc(photo.src)+'" alt="'+esc(photo.title)+'"><div><h3>'+esc(photo.title)+'</h3><p>'+esc(photo.caption)+'</p></div></article>';
    }).join('');
  }

  function run(){renderVenueGallery();}
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',run); else run();
  window.addEventListener('load',function(){run();setTimeout(run,300);setTimeout(run,1200);});
})();