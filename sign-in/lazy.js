
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('img.lazy-img');
    const lazySources = document.querySelectorAll('source[data-srcset]');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // For <img>
                    if (img.tagName === "IMG" && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy-img");
                        observer.unobserve(img);
                    }

                    // For <source> inside <picture>
                    if (img.tagName === "SOURCE" && img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        observer.unobserve(img);
                    }
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
        lazySources.forEach(source => observer.observe(source));

    } else {
        // Fallback: just load all images
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
        lazySources.forEach(source => {
            source.srcset = source.dataset.srcset;
        });
    }
});
