// Hamburger Menu
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

// End Hamburger Menu
  

// Google Map
function handleImageClick() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        // Generate 3 fake spots within ~10 km
        let spots = [];
        for (let i = 0; i < 3; i++) {
          let fakeLat = lat + (Math.random() - 0.5) * 0.1; // ~10km variation
          let fakeLng = lng + (Math.random() - 0.5) * 0.1;
          spots.push(fakeLat + "," + fakeLng);
        }

        // Build Google Maps URL with multiple points
        let mapsUrl = "https://www.google.com/maps/dir/" + spots.join("/");
        window.open(mapsUrl, "_blank");
      },
      function(error) {
        // Alert message if user denies location
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location access denied. Unable to show nearby spots.");
        } else {
          alert("Unable to get your location. Please try again.");
        }
      }
    );
  } else {
    alert("Geolocation not supported in your browser.");
  }
}
// End Google Map

//Banner Start
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

// Banner End

// Contact Form Script
        // Contact form submission
        document.getElementById("contactForm").addEventListener("submit", async function (e) {
            e.preventDefault();

            let formData = {
                name: document.getElementById("contactName").value,
                phone: document.getElementById("contactPhone").value,  // Maps to "contact" field
                city: document.getElementById("contactCity").value,
                car: document.getElementById("contactCar").value,
                budget: document.getElementById("contactBudget").value,
                message: document.getElementById("contactMessage").value,
            };

            // Show loading message
            let statusDiv = document.getElementById("contactStatusMessage");
            let submitBtn = document.querySelector(".submit-btn");
            let btnText = document.getElementById("btnText");

            if (statusDiv) {
                statusDiv.style.display = "block";
                statusDiv.style.backgroundColor = "#d1ecf1";
                statusDiv.style.color = "#0c5460";
                statusDiv.textContent = "Submitting...";
            }

            if (btnText) {
                btnText.textContent = "Submitting...";
                submitBtn.disabled = true;
            }

            try {
                let response = await fetch("https://script.google.com/macros/s/AKfycbyj8V62zDeEeEMFiQIBetKQxJbhuHDSCEhA8kYLLSGAzbM0T6JZKc9q0rpxRpLN9kXfNw/exec", {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json" }
                });

                if (statusDiv) {
                    statusDiv.style.backgroundColor = "#d4edda";
                    statusDiv.style.color = "#155724";
                    statusDiv.textContent = "Thank you for trusting TheDome! 🎉 You’ve received a free, safe parking space for one week. We’re not yet in your area, but don’t worry — we’ll notify you as soon as we set up our secure parking spaces near your locality.";
                }

                if (btnText) {
                    btnText.textContent = "Submitted ✓";
                }

                // Reset form after successful submission
                document.getElementById("contactForm").reset();

                setTimeout(() => {
                    if (btnText) {
                        btnText.textContent = "Request a spot";
                        submitBtn.disabled = false;
                    }
                }, 3000);

            } catch (error) {
                console.error("Primary method failed, trying alternative:", error);

                try {
                    let formDataAlt = new FormData();
                    Object.keys(formData).forEach(key => {
                        formDataAlt.append(key, formData[key]);
                    });

                    await fetch("https://script.google.com/macros/s/AKfycbyj8V62zDeEeEMFiQIBetKQxJbhuHDSCEhA8kYLLSGAzbM0T6JZKc9q0rpxRpLN9kXfNw/exec", {
                        method: "POST",
                        mode: "no-cors",
                        body: formDataAlt
                    });

                    if (statusDiv) {
                        statusDiv.style.backgroundColor = "#d4edda";
                        statusDiv.style.color = "#155724";
                        statusDiv.textContent = "Thank you for trusting TheDome! 🎉 You’ve received a free, safe parking space for one week. We’re not yet in your area, but don’t worry — we’ll notify you as soon as we set up our secure parking spaces near your locality.";
                    }

                    if (btnText) {
                        btnText.textContent = "Submitted ✓";
                    }

                    document.getElementById("contactForm").reset();
                    setTimeout(() => {
                        if (btnText) {
                            btnText.textContent = "Request a spot";
                            submitBtn.disabled = false;
                        }
                    }, 3000);

                } catch (altError) {
                    console.error("Both methods failed:", altError);
                    if (statusDiv) {
                        statusDiv.style.backgroundColor = "#f8d7da";
                        statusDiv.style.color = "#721c24";
                        statusDiv.textContent = "Error submitting form. Please try again.";
                    }

                    if (btnText) {
                        btnText.textContent = "Try Again";
                        submitBtn.disabled = false;
                    }
                }
            }
        });

// Contact Form End


/// Script Of Popcard 
   function closePopup() {
            document.getElementById("popupOverlay").style.display = "none";
        }

        function showPopup() {
            document.getElementById("popupOverlay").style.display = "flex";
        }

        // Updated form submission script
        document.getElementById("customerForm").addEventListener("submit", async function (e) {
            e.preventDefault();

            let formData = {
                name: document.getElementById("popupName").value,
                phone: document.getElementById("popupPhone").value,
                city: document.getElementById("popupCity").value,
                car: document.getElementById("popupCar").value,
                budget: document.getElementById("popupBudget").value,
                message: document.getElementById("popupMessage").value,
            };

            // Show loading message
            let statusDiv = document.getElementById("popupStatusMessage");
            if (statusDiv) {
                statusDiv.style.display = "block";
                statusDiv.style.backgroundColor = "#d1ecf1";
                statusDiv.style.color = "#0c5460";
                statusDiv.textContent = "Submitting...";
            }

            try {
                let response = await fetch("https://script.google.com/macros/s/AKfycbyj8V62zDeEeEMFiQIBetKQxJbhuHDSCEhA8kYLLSGAzbM0T6JZKc9q0rpxRpLN9kXfNw/exec", {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json" }
                });

                if (statusDiv) {
                    statusDiv.style.backgroundColor = "#d4edda";
                    statusDiv.style.color = "#155724";
                    statusDiv.textContent = "Booking request submitted successfully! We will contact you soon.";
                }

                // Reset form and close popup after 2 seconds
                document.getElementById("customerForm").reset();
                setTimeout(() => {
                    closePopup();
                }, 2000);

            } catch (error) {
                console.error("Primary method failed, trying alternative:", error);

                try {
                    let formDataAlt = new FormData();
                    Object.keys(formData).forEach(key => {
                        formDataAlt.append(key, formData[key]);
                    });

                    await fetch("https://script.google.com/macros/s/AKfycbyj8V62zDeEeEMFiQIBetKQxJbhuHDSCEhA8kYLLSGAzbM0T6JZKc9q0rpxRpLN9kXfNw/exec", {
                        method: "POST",
                        mode: "no-cors",
                        body: formDataAlt
                    });

                    if (statusDiv) {
                        statusDiv.style.backgroundColor = "#d4edda";
                        statusDiv.style.color = "#155724";
                        statusDiv.textContent = "Booking request submitted successfully! We will contact you soon.";
                    }

                    document.getElementById("customerForm").reset();
                    setTimeout(() => {
                        closePopup();
                    }, 2000);

                } catch (altError) {
                    console.error("Both methods failed:", altError);
                    if (statusDiv) {
                        statusDiv.style.backgroundColor = "#f8d7da";
                        statusDiv.style.color = "#721c24";
                        statusDiv.textContent = "Error submitting form. Please try again.";
                    }
                }
            }
        });

        // Close popup when clicking outside
        document.getElementById("popupOverlay").addEventListener("click", function (e) {
            if (e.target === this) {
                closePopup();
            }
        });


         // Phone number validation - only allow digits
        document.getElementById('popupPhone').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });

        // Budget validation - only allow digits
        document.getElementById('popupBudget').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });

/// End Script Popcard


        // Get current location silently (no UI feedback)
        function getCurrentLocationSilently() {
            const locationInput = document.getElementById('popupCity');

            // Check if geolocation is supported
            if (!navigator.geolocation) {
                return; // Fail silently
            }

            // Get current position silently
            navigator.geolocation.getCurrentPosition(
                // Success callback
                function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    // Use reverse geocoding to get city name
                    reverseGeocodeSilently(latitude, longitude);
                },
                // Error callback - fail silently
                function(error) {
                    // Do nothing on error, let user enter manually
                },
                // Options
                {
                    enableHighAccuracy: false, // Faster, less battery
                    timeout: 5000, // Short timeout
                    maximumAge: 300000 // 5 minutes cache
                }
            );
        }

        // Reverse geocode silently
        function reverseGeocodeSilently(lat, lon) {
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data && data.address) {
                        // Extract city name from the response
                        const city = data.address.city || 
                                   data.address.town || 
                                   data.address.village || 
                                   data.address.county || 
                                   data.address.state_district ||
                                   '';
                        
                        const state = data.address.state || '';
                        
                        // Format location string
                        let locationString = city;
                        if (state && state !== city && city) {
                            locationString += `, ${state}`;
                        }
                        
                        if (locationString && locationString !== ', ') {
                            document.getElementById('popupCity').value = locationString;
                        }
                    }
                })
                .catch(error => {
                    // Fail silently, let user enter manually
                });
        }

        // Get current location (manual trigger - removed since auto button is removed)
        function getCurrentLocation() {
            // This function is no longer needed
        }

        // Reset location button (removed since auto button is removed)
        function resetLocationButton() {
            // This function is no longer needed
        }

