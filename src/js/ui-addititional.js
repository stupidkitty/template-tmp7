const menu = document.querySelector('.jsMenuHeader')
const btnMenuShow = document.querySelector('.jsBtnMenu')
const btnMenuClose = document.querySelector('.jsBtnMenuClose')

btnMenuShow.addEventListener('click', () => {
  menu.classList.add('menu_isActive')
})

btnMenuClose.addEventListener('click', () => {
  menu.classList.remove('menu_isActive')
})

const searchForm = document.querySelector('.page-header__search-form')
const btnSearchShow = document.querySelector('.jsBtnSearchShow')
const btnSearchClose = document.querySelector('.jsBtnSearchClose')

btnSearchShow.addEventListener('click', () => {
  searchForm.classList.add('page-header__search-form_isActive')
  const input = document.querySelector('.jsSearchInput')
  input.focus()
})

btnSearchClose.addEventListener('click', () => {
  searchForm.classList.remove('page-header__search-form_isActive')
})
