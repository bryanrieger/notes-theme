
/* ƒn() delayFor ----------------------------------------------------------- */

const delayFor = (milliseconds) => { 
	
  return new Promise(resolve => { 
	  setTimeout(resolve, milliseconds); 
  });
  
}

/* ƒn() scrollIntoViewWithOffset ------------------------------------------- */

const scrollIntoViewWithOffset = (element, offset) => {
	
  window.scrollTo({ 
	behavior: 'smooth', 
	top: document.querySelector(element).getBoundingClientRect().top - document.body.getBoundingClientRect().top - offset 
  });
  
}

/* ƒn() scrollObserver ----------------------------------------------------- */

// const scrollObserver = new IntersectionObserver(entries => {
// 	entries.forEach(entry => {
// 		if (entry.isIntersecting) {
// 			entry.target.classList.add('intersecting');
// 		} else {
// 			// entry.target.classList.remove('intersecting');
// 		}
// 	});
// }, { rootMargin: '0 0 -50px 0', threshold: 1.0 });

// const observables = document.querySelectorAll(".observable");
// if (observables) {
// 	observables.forEach(observable => {
// 		scrollObserver.observe(observable);
// 	});
// }

/* ƒn() timeAgo ------------------------------------------------------------ */

const timeAgo = (timestamp, style = 'long', locale = 'en') => {

  let value;
  const diff = (new Date().getTime() - timestamp.getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: style });

  if (years > 0) {
	value = rtf.format(0 - years, "year");
  } else if (months > 0) {
	value = rtf.format(0 - months, "month");
  } else if (days > 0) {
	value = rtf.format(0 - days, "day");
  } else if (hours > 0) {
	value = rtf.format(0 - hours, "hour");
  } else if (minutes > 0) {
	value = rtf.format(0 - minutes, "minute");
  } else {
	value = rtf.format(0 - diff, "second");
  }

  return value.replace(/\./g, '');
  
}

/* ♾️ ƒn() process time[datetime][data-format] ----------------------------- */

const enableRelativeTimes  = () => {
	const times = document.querySelectorAll("time[datetime][data-format]");

	if (times) {
		times.forEach(time => {
			let datetime = time.getAttribute("datetime");
			let date = new Date(datetime);
			let format = time.getAttribute("data-format");
			time.classList.add("date-relative");
			time.innerText = timeAgo(date, format);
		});
	}
}

/* ♾️ ƒn() process [class=spoilers] ---------------------------------------- */

const enableSpoilers  = () => {
	const spoilers = document.querySelectorAll(".spoiler");

	if (spoilers) {
		spoilers.forEach(el => el.addEventListener("click", function() {
			this.classList.remove("spoiler");
			this.classList.add("spoiled-revealed");
		}));
	}
}

/* ƒn() enhance input[id=switch] ------------------------------------------- */

const enableContentsSwitch  = () => {
	const page = {
		header: document.querySelector("body > header"),
		nav: document.querySelector("body > nav")
	}
	
	const menu = {
		input: {
			switch: document.querySelector("body > header input[id=switch]"),
		},
		label: {
			span: document.querySelector("body > header label[for=switch] span"),
			svg: {
				use: document.querySelector("body > header label[for=switch] svg use")
			},
			switch: document.querySelector("body > header label[for=switch]")
		}
	}

	menu.label.text = menu.label.span.innerText;
	menu.label.text_alt = menu.label.span.getAttribute("data-switch");
	menu.label.svg.id = menu.label.svg.use.getAttribute("href")
	menu.label.svg.id_alt = menu.label.svg.use.getAttribute("data-switch");

	menu.label.switch.addEventListener("click", function (e) {
		menu.label.svg.use.setAttribute("href", (menu.input.switch.checked) ? menu.label.svg.id : menu.label.svg.id_alt);
		menu.label.span.innerText = (menu.input.switch.checked) ? menu.label.text : menu.label.text_alt;
	});
	
	document.addEventListener('click', (event) => {
		if (( !page.header.contains(event.target) && !page.nav.contains(event.target)) && menu.input.switch.checked) {
			menu.input.switch.checked = false;
			menu.label.svg.use.setAttribute("href", menu.label.svg.id );
			menu.label.span.innerText = menu.label.text;
		}
	});
}

/* ƒn() init --------------------------------------------------------------- */

const init = () => { 
	enableContentsSwitch();
	enableRelativeTimes();
	enableSpoilers();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init)
} else {
	init();
}

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/assets/scripts/worker.js");
};