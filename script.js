const events = [
 {id:1,title:"The Sound of Tomorrow",category:"Music",date:"2026-11-14",time:"6:30 PM",venue:"Ekamra Haat, Bhubaneswar",price:"₹499 onwards",desc:"An open-air evening of indie music, fresh sounds and good company. Discover emerging artists and enjoy a night under the stars.",image:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85"},
 {id:2,title:"Future Forward Summit",category:"Technology",date:"2026-11-20",time:"9:30 AM",venue:"KIIT Convention Centre",price:"Free entry",desc:"A day of ideas, demos and conversations around AI, engineering and the technology shaping tomorrow. Meet curious minds and builders.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85"},
 {id:3,title:"The Art of Seeing",category:"Art",date:"2026-11-22",time:"11:00 AM",venue:"Odisha State Museum",price:"₹199 onwards",desc:"Explore visual storytelling through an intimate exhibition of contemporary art, photography and installations by local creators.",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85"},
 {id:4,title:"Sunday Slowdown",category:"Wellness",date:"2026-11-29",time:"7:00 AM",venue:"Ekamra Kanan Botanical Gardens",price:"₹299 onwards",desc:"Press pause with a mindful morning of guided yoga, breathing exercises and a relaxed community breakfast in the garden.",image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85"},
 {id:5,title:"Acoustic Courtyard",category:"Music",date:"2026-12-05",time:"5:00 PM",venue:"Bhubaneswar Art Gallery",price:"₹349 onwards",desc:"An intimate acoustic session featuring soulful voices, stripped-back arrangements and a cosy courtyard atmosphere.",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85"},
 {id:6,title:"Design Your Tomorrow",category:"Technology",date:"2026-12-12",time:"10:00 AM",venue:"Startup Odisha Hub",price:"₹249 onwards",desc:"A hands-on design-thinking workshop where you can turn everyday problems into practical ideas with a room full of makers.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85"}
];
let activeCategory = "All";
let selectedEvent = null;
const grid = document.getElementById("eventsGrid");
const searchInput = document.getElementById("searchInput");
const eventDialog = document.getElementById("eventDialog");
const registerDialog = document.getElementById("registerDialog");
const toast = document.getElementById("toast");

function dateParts(dateString){
 const d = new Date(dateString + "T12:00:00");
 return {day:d.getDate(),month:d.toLocaleString("en",{month:"short"}),weekday:d.toLocaleString("en",{weekday:"short"})};
}
function renderEvents(){
 const term = searchInput.value.trim().toLowerCase();
 const filtered = events.filter(e => (activeCategory === "All" || e.category === activeCategory) &&
   [e.title,e.category,e.venue,e.desc].some(v => v.toLowerCase().includes(term)));
 grid.innerHTML = filtered.map(e => {
  const d = dateParts(e.date);
  return `<article class="event-card" tabindex="0" role="button" aria-label="View ${e.title}" data-id="${e.id}">
   <div class="event-cover" style="background-image:url('${e.image}')"><span class="event-tag">${e.category}</span><div class="event-date"><strong>${d.day}</strong><small>${d.month.toUpperCase()}</small></div></div>
   <div class="event-info"><div class="event-meta"><span>${d.weekday} · ${e.time}</span><span>↗ ${e.venue.split(",")[0]}</span></div><h3>${e.title}</h3><p>${e.desc}</p><div class="event-card-bottom"><span>${e.price}</span><span>↗</span></div></div>
  </article>`;
 }).join("");
 document.getElementById("emptyState").hidden = filtered.length !== 0;
 grid.querySelectorAll(".event-card").forEach(card => {
  card.addEventListener("click",()=>showEvent(Number(card.dataset.id)));
  card.addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();showEvent(Number(card.dataset.id));}});
 });
}
function showEvent(id){
 selectedEvent = events.find(e=>e.id===id);
 const d = dateParts(selectedEvent.date);
 document.getElementById("dialogContent").innerHTML = `<div class="dialog-hero" style="background-image:url('${selectedEvent.image}')"></div><div class="dialog-body"><div class="eyebrow">${selectedEvent.category} · FEATURED EVENT</div><h2>${selectedEvent.title}</h2><p>${selectedEvent.desc}</p><div class="dialog-details"><span>◷ ${d.weekday}, ${d.day} ${d.month} · ${selectedEvent.time}</span><span>⌖ ${selectedEvent.venue}</span><strong>${selectedEvent.price}</strong></div><button class="button button-dark" id="openRegister">Register for this event <span>↗</span></button></div>`;
 document.getElementById("openRegister").addEventListener("click",()=>{eventDialog.close();openRegistration();});
 eventDialog.showModal();
}
function openRegistration(){
 document.getElementById("selectedEventName").textContent = selectedEvent.title;
 document.getElementById("formMessage").textContent = "";
 document.getElementById("registrationForm").reset();
 registerDialog.showModal();
}
document.getElementById("filters").addEventListener("click",e=>{
 const button=e.target.closest("button[data-category]");
 if(!button)return;
 activeCategory=button.dataset.category;
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));
 renderEvents();
});
searchInput.addEventListener("input",renderEvents);
document.getElementById("dialogClose").addEventListener("click",()=>eventDialog.close());
document.getElementById("registerClose").addEventListener("click",()=>registerDialog.close());
[eventDialog,registerDialog].forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close();}));
document.getElementById("registrationForm").addEventListener("submit",e=>{
 e.preventDefault();
 const form=e.currentTarget;
 const name=form.fullName.value.trim(), email=form.email.value.trim(), phone=form.phone.value.trim();
 const message=document.getElementById("formMessage");
 if(name.length<2){message.textContent="Please enter your full name (at least 2 characters).";form.fullName.focus();return;}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){message.textContent="Please enter a valid email address.";form.email.focus();return;}
 if(!/^[0-9+\-\s]{10,15}$/.test(phone)){message.textContent="Please enter a valid phone number (10–15 characters).";form.phone.focus();return;}
 const registrations=JSON.parse(localStorage.getItem("gatherlyRegistrations")||"[]");
 registrations.push({name,email,phone,event:selectedEvent.title,registeredAt:new Date().toISOString()});
 localStorage.setItem("gatherlyRegistrations",JSON.stringify(registrations));
 registerDialog.close();
 showToast(`You're registered, ${name.split(" ")[0]}! See you there.`);
});
function showToast(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),3200);}
document.getElementById("themeToggle").addEventListener("click",()=>{
 document.body.classList.toggle("dark");
 document.getElementById("themeToggle").textContent=document.body.classList.contains("dark")?"☀":"☾";
});
document.getElementById("menuToggle").addEventListener("click",()=>{
 const nav=document.getElementById("nav"),open=nav.classList.toggle("open");
 document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("newsletterForm").addEventListener("submit",e=>{
 e.preventDefault();
 const email=document.getElementById("newsletterEmail");
 document.getElementById("newsletterMessage").textContent=`Thanks! Updates will be sent to ${email.value}.`;
 email.value="";
});
document.getElementById("year").textContent=new Date().getFullYear();
renderEvents();