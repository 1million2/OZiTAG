const navMain = document.querySelector(".main");
const navLink = document.querySelectorAll(".main-drop-down__nav");
const dropDownMain = document.querySelector(".main-drop-down");
const dropDown = document.querySelector(".drop-down");
const dropDownContent = document.querySelectorAll(".drop-down__content");
const subMenu = document.querySelectorAll(".sub-menu");
const subSubMenu = document.querySelectorAll(".sub-sub-menu");
const li1 = document.querySelectorAll(".main-drop-down__nav li");

// эллемент списка который содержит подменю
let itemWithSubMenu = [];
for (i = 0; i < li1.length; i++) {
	if (li1[i].children.length > 1) {
		itemWithSubMenu.push(li1[i]);
	}
}

// добавляем стрелку drop-down-menu ко всем элементам которые содержат внутри себя подменю
for (i = 0; i < itemWithSubMenu.length; i++) {
	const span = document.createElement("span");
	span.classList.add("icon-circle-down");
	itemWithSubMenu[i].classList.add("item-with-sub-menu");
	itemWithSubMenu[i].querySelector("a").after(span);
}


const arrowDown = document.querySelectorAll(".icon-circle-down");

// Если у пункта меню есть подменю, оно должно открываться по нажатию на стрелочку и только на нее, сам пункт меню должен быть ссылкой самостоятельной. При открытии какого-то элемента меню, остальные на этом уровне должны закрываться. Например если мы открываем Элемент 2, то Элемент 4 должен закрываться. Аналогично и на втором уровне.
arrowDown.forEach( function(item) {
	item.addEventListener("click", function (e) {

		// если стрелка уже нажата
		if (e.target.classList.contains("active")) {
			// у всех стрелок удаляем активный класс
			item.classList.remove("active");
			// у стрекли по которой кликнули удаляем активный класс
			e.target.classList.remove("active");
			// скрываем подменю которое находится под стрелкой
			e.target.nextElementSibling.classList.remove("active");
			// скрываем все под-под меню
			subSubMenu.forEach( function(item) {
				item.classList.remove("active");
				// удаляем активный класс у всех стрелок подменю
				item.previousElementSibling.classList.remove("active");
			});

		}
		// если стрелка нажата у подменю
		else if (e.target.closest(".sub-menu.active")) {
			// удаляем у всех под-под меню активные классы
			subSubMenu.forEach( function(item) {
				item.classList.remove("active");
			});
			// удаляем у всех стрелок активный класс
			arrowDown.forEach( function(item) {
				item.classList.remove("active");
			});
			// добавляем активный класс стрелки которую клкнули
			e.target.classList.add("active");
			// добавляем активный класс подменю который лежит след. за стрелкой
			e.target.nextElementSibling.classList.add("active");
			// стрелке уровня выше добавляем активный класс
			e.target.closest(".sub-menu.active").previousElementSibling.classList.add("active");
		}

		// если стрелка не нажата
		else {
			remAllActiveClass();
			// добавляем активный класс стрелке по которой кликнули
			e.target.classList.add("active");
			// показываем подменю, которое идет за стрелкой по которой кликнули
			e.target.nextElementSibling.classList.add("active");
			// скролим страницу, что бы эл. был вверху
			e.target.scrollIntoView();

		}

	});
});

const ul = document.querySelector(".main__nav");
const li = ul.querySelectorAll("li");


// отменяем стандартное поведение ссылок, которые лежат внутри drop-down menu
navLink.forEach( function(item) {
	item.addEventListener("click", function (e) {
		e.preventDefault();
	})
});

// функция которая добавляет класс при ховере на эллемент списка 
function addClass (indexLi, indexDropDownContent) {
	li[indexLi].addEventListener("mouseover", function (event) {
		dropDown.classList.add("drop-down-active");
		dropDownContent[indexDropDownContent].classList.add("drop-down__content-active");
	})
}

// функция которая удаляет класс при потере ховера на эллемента списка 
function remClass (indexLi, indexDropDownContent) {
	li[indexLi].addEventListener("mouseout", function (event) {
		dropDown.classList.remove("drop-down-active");
		dropDownContent[indexDropDownContent].classList.remove("drop-down__content-active");
	})
}

// слушаем ховер на выпадающем меню, если есть ховер - добавляем класс, если нет - удаляем
for (let i = 0; i < dropDownContent.length; i++) {
	dropDownContent[i].addEventListener("mouseover", function () {
		dropDownContent[i].classList.add("drop-down__content-active");
		dropDown.classList.add("drop-down-active");
	})

	dropDownContent[i].addEventListener("mouseout", function () {
		dropDownContent[i].classList.remove("drop-down__content-active");
		dropDown.classList.remove("drop-down-active");
	})
}
// ф-ция которая удаляет активный класс у всех стрелок, подменю, под-подменю
const remAllActiveClass = function () {

	// при закрытии меню-бургера удаляем активный класс у всех подменю
	subMenu.forEach( function(item) {
		item.classList.remove("active");
	});
	// при закрытии меню-бургера удаляем активный класс у всех под-под меню
	subSubMenu.forEach( function(item) {
		item.classList.remove("active");
	});
	// при закрытии меню-бургера удаляем активный класс у всех стрелок
	arrowDown.forEach( function(item) {
		item.classList.remove("active");
	});

}

// burger button
const openBurgerMenu = function () {
	const burgerButton = document.querySelector(".burger-button");

	burgerButton.addEventListener("click", function () {

		if (burgerButton.classList.contains("active")) {

			burgerButton.classList.remove("active");
			dropDownMain.classList.remove("active");

			remAllActiveClass();

		}
		else {
			burgerButton.classList.add("active");
			dropDownMain.classList.add("active");
		}
		// если ширина экрана больше 768px при открытом бургер меню, мы его закрываем
		window.addEventListener("resize", function (e) {
		
			if (document.body.clientWidth > 768) {
				dropDownMain.classList.remove("active");
				burgerButton.classList.remove("active");
				remAllActiveClass();
			}
		})

	})
}


addClass(1, 0);
addClass(3, 1);
remClass(1, 0);
remClass(3, 1);
openBurgerMenu();

