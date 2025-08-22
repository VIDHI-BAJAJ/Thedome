function toggleMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navbar = document.querySelector('.navbar');
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            if (!navbar.contains(event.target) && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                const hamburger = document.querySelector('.hamburger');
                const mobileMenu = document.getElementById('mobileMenu');
                
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

       
function handleImageClick() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      // Generate 3 fake spots within ~10 km
      let spots = [];
      for (let i = 0; i < 3; i++) {
        let fakeLat = lat + (Math.random() - 0.5) * 0.1;  // ~10km variation
        let fakeLng = lng + (Math.random() - 0.5) * 0.1;
        spots.push(fakeLat + "," + fakeLng);
      }

      // Build Google Maps URL with multiple points
      let mapsUrl = "https://www.google.com/maps/dir/" + spots.join("/");
      window.open(mapsUrl, "_blank");
    }, function(error) {
      // If user denies location → fallback to Hyderabad
      let mapsUrl = "https://www.google.com/maps/dir/17.385044,78.486671/17.395044,78.496671/17.405044,78.476671";
      window.open(mapsUrl, "_blank");
    });
  } else {
    alert("Geolocation not supported in your browser.");
  }
}

        // Add scroll animations
        function animateOnScroll() {
            const banner = document.querySelector('.banner');
            const bannerTop = banner.offsetTop;
            const bannerHeight = banner.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;

            if (scrollTop + windowHeight > bannerTop + bannerHeight * 0.1) {
                banner.classList.add('animate');
            }
        }

        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = counter.textContent;
                const isRating = target.includes('★');
                
                if (!isRating) {
                    const numericTarget = parseInt(target.replace('+', ''));
                    let current = 0;
                    const increment = numericTarget / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericTarget) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                        }
                    }, 30);
                }
            });
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(animateCounters, 500);
        });

        // Add resize handler for better responsive behavior
        window.addEventListener('resize', () => {
            // Handle any resize-specific logic here
            const banner = document.querySelector('.banner');
            banner.style.transition = 'none';
            setTimeout(() => {
                banner.style.transition = '';
            }, 100);
        });

        // Add touch gestures for mobile
        let startX, startY, distX, distY;
        const banner = document.querySelector('.banner');

        banner.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        banner.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            distX = e.touches[0].clientX - startX;
            distY = e.touches[0].clientY - startY;
            
            // Prevent default scrolling if horizontal swipe
            if (Math.abs(distX) > Math.abs(distY)) {
                e.preventDefault();
            }
        });

        banner.addEventListener('touchend', () => {
            startX = null;
            startY = null;
            distX = null;
            distY = null;
        });


        // Show popup on first visit
window.addEventListener("load", () => {
  document.getElementById("popupOverlay").style.display = "flex";
  detectCity();
});

// Detect City (no API key, just fallback text if denied)
function detectCity() {
  const cityInput = document.getElementById("custCity");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;

      try {
        let res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        let data = await res.json();
        let city = data.address.city || data.address.town || data.address.village || "Unknown";
        cityInput.value = city;
      } catch {
        cityInput.value = "Unable to detect";
      }
    }, () => {
      cityInput.value = "Location denied";
    });
  } else {
    cityInput.value = "Not supported";
  }
}
