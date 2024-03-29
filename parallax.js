 /**
 * @property {HTMLElement} element
 * @property {{y: number, r: number, variable: boolean}} options
 */
export class Parallax {

/**
 * @param {HTMLElement} element
 */
constructor(element) {
    this.element = element;
    this.options = this.parseAttribute();

    this.onScroll = this.onScroll.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
    this.onResize = this.onResize.bind(this);

    this.elementY = this.offsetTop(this.element) + this.element.offsetHeight / 2;
    const observer = new IntersectionObserver(this.onIntersection);
    observer.observe(element);
    this.onScroll();
}

/**
 * Calcul la position de l'élément par rapport au haut de la page
 * @param {HTMLElement} element
 * @return {number}
 */
offsetTop(element, acc = 0) {
    if (element.offsetParent) {
      return this.offsetTop(element.offsetParent, acc + element.offsetTop);
    }
    return acc + element.offsetTop;
}

parseAttribute() {
    const defaultOptions = {
    y: 0.2,
    x: 0,
    r: 0,
    variable: false,
    };
    if (this.element.dataset.parallax.startsWith("{")) {
    return {
        ...defaultOptions,
        ...JSON.parse(this.element.dataset.parallax),
    };
    }
    return { ...defaultOptions, y: parseFloat(this.element.dataset.parallax) };
}

/**
 * @param {IntersectionObserverEntry[]} entries
 */
onIntersection(entries) {
    for (const entry of entries) {
    if (entry.isIntersecting) {
        document.addEventListener("scroll", this.onScroll);
        window.addEventListener("resize", this.onResize);
        this.elementY = this.offsetTop(this.element) + this.element.offsetHeight / 2;
    } else {
        document.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.onResize);
    }
    }
}

onResize() {
    this.elementY = this.offsetTop(this.element) + this.element.offsetHeight / 2;
    this.onScroll();
}

onScroll() {
    window.requestAnimationFrame(() => {
    const screenY = window.scrollY + window.innerHeight / 2;
    const diffY = this.elementY - screenY;
    const translateY = diffY * -1 * this.options.y;
    if (this.options.variable) {
        this.element.style.setProperty("--parallaxY", `${translateY}px`);
    } else {
        let transform = `translateY(${translateY}px)`;
        if (this.options.r) {
        transform += ` rotate(${diffY * this.options.r}deg)`;
        }
        if (this.options.x) {
            transform += ` translateX(${diffY * this.options.x}px)`;
        }
        this.element.style.setProperty("transform", transform);
    }
    });
}

/**
 * @returns {Parallax[]}
 */
static bind() {
    return Array.from(document.querySelectorAll("[data-parallax]")).map(
    (element) => {
        return new Parallax(element);
    }
    );
}
}  