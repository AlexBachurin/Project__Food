function tabs(tabsContentSelector, tabLinksWrapperSelector, tabLinksSelector, activeClass) {
    //TABS
    const tabContent = document.querySelectorAll(tabsContentSelector),
        tabLinksWrapper = document.querySelector(tabLinksWrapperSelector),
        tabLinks = tabLinksWrapper.querySelectorAll(tabLinksSelector)

    const hideTabs = () => {
        tabContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })

        tabLinks.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    const showTab = (i = 0) => {
        tabContent[i].classList.add('show', 'fade')
        tabContent[i].classList.remove('hide')
        tabLinks[i].classList.add(activeClass)
    }

    hideTabs();
    showTab();

    tabLinksWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target
        if (target && target.classList.contains(tabLinksSelector.slice(1))) {
            tabLinks.forEach((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTab(i)
                }
            })
        }
    })
}

export default tabs;