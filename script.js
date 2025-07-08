document.addEventListener("DOMContentLoaded", () => {
  // Cart functionality
  let cart = []
  let cartTotal = 0

  // Wishlist functionality
  let wishlist = []

  // Search functionality
  const searchToggle = document.getElementById("search-toggle")
  const searchContainer = document.querySelector(".search-container")
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")
  const searchModal = document.getElementById("search-modal")
  const searchResults = document.getElementById("search-results")
  const closeSearch = document.getElementById("close-search")

  // Wishlist elements
  const wishlistIcon = document.getElementById("wishlist-icon")
  const wishlistBadge = document.getElementById("wishlist-badge")
  const wishlistSidebar = document.getElementById("wishlist-sidebar")
  const closeWishlist = document.getElementById("close-wishlist")
  const wishlistItems = document.getElementById("wishlist-items")

  // Products data for search - Updated with bread names
  const products = [
    {
      name: "Roti Burger",
      price: 15000,
      image: "image/buger.jpg",
      description: "Roti burger lembut dan empuk, sempurna untuk sandwich favorit Anda",
    },
    {
      name: "Roti Tawar",
      price: 12000,
      image: "image/pasta.jpg",
      description: "Roti tawar putih klasik yang lembut, cocok untuk sarapan setiap hari",
    },
    {
      name: "Roti Gandum",
      price: 18000,
      image: "image/lasagna.webp",
      description: "Roti gandum utuh yang sehat dan bergizi, kaya akan serat",
    },
    {
      name: "Roti Coklat",
      price: 20000,
      image: "image/chocolate_Drink.jpg",
      description: "Roti manis dengan isian coklat yang lezat dan menggugah selera",
    },
    {
      name: "Roti Pizza",
      price: 25000,
      image: "image/pizza.jpg",
      description: "Base roti pizza yang crispy dan lembut, siap untuk topping favorit",
    },
    {
      name: "Roti Hot Dog",
      price: 16000,
      image: "image/Hot_dog.jpg",
      description: "Roti hot dog yang lembut dan panjang, cocok untuk sosis kesukaan",
    },
    {
      name: "Roti Manis",
      price: 14000,
      image: "image/juse.jpg",
      description: "Roti manis dengan tekstur lembut dan rasa yang pas untuk cemilan",
    },
    {
      name: "Roti Bakar",
      price: 22000,
      image: "image/biryani.webp",
      description: "Roti bakar dengan berbagai pilihan topping dan selai favorit",
    },
    {
      name: "Roti Kue",
      price: 28000,
      image: "image/chocolate.jpg",
      description: "Roti kue lembut dengan lapisan cream dan topping coklat premium",
    },
    {
      name: "Roti Es Krim",
      price: 24000,
      image: "image/ice_cream.jpg",
      description: "Roti manis yang disajikan dengan es krim vanilla dan topping",
    },
    {
      name: "Roti Spageti",
      price: 26000,
      image: "image/Spanchi.jpg",
      description: "Roti unik dengan topping spageti dan saus bolognese yang lezat",
    },
    {
      name: "Roti Sandwich",
      price: 19000,
      image: "image/sandwich.jpg",
      description: "Roti sandwich segar dengan berbagai pilihan isian sehat dan lezat",
    },
  ]

  // Elements
  const cartIcon = document.getElementById("cart-icon")
  const cartBadge = document.getElementById("cart-badge")
  const cartSidebar = document.getElementById("cart-sidebar")
  const closeCart = document.getElementById("close-cart")
  const cartItems = document.getElementById("cart-items")
  const cartTotalElement = document.getElementById("cart-total")
  const totalAmount = document.getElementById("total-amount")
  const checkoutBtn = document.getElementById("checkout-btn")
  const checkoutModal = document.getElementById("checkout-modal")
  const successModal = document.getElementById("success-modal")

  // Add to cart buttons
  const addToCartBtns = document.querySelectorAll(".add-to-cart")

  // Original order functionality
  const orderBtn = document.querySelector(".order_btn")

  // Cart functions
  function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartBadge.textContent = totalItems
    cartBadge.style.display = totalItems > 0 ? "flex" : "none"
  }

  function updateCartTotal() {
    cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    totalAmount.textContent = cartTotal.toLocaleString("id-ID")
    document.getElementById("final-total").textContent = cartTotal.toLocaleString("id-ID")
  }

  function addToCart(name, price, image) {
    const existingItem = cart.find((item) => item.name === name)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        name: name,
        price: Number.parseInt(price),
        image: image,
        quantity: 1,
      })
    }

    updateCartDisplay()
    updateCartBadge()
    updateCartTotal()

    // Show success message
    showNotification(`${name} ditambahkan ke keranjang!`)
  }

  function removeFromCart(name) {
    cart = cart.filter((item) => item.name !== name)
    updateCartDisplay()
    updateCartBadge()
    updateCartTotal()
  }

  function updateQuantity(name, change) {
    const item = cart.find((item) => item.name === name)
    if (item) {
      item.quantity += change
      if (item.quantity <= 0) {
        removeFromCart(name)
      } else {
        updateCartDisplay()
        updateCartBadge()
        updateCartTotal()
      }
    }
  }

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-cart-shopping" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>                 
                    <p>Keranjang belanja kosong</p>
                </div>
            `
      cartTotalElement.style.display = "none"
    } else {
      cartItems.innerHTML = cart
        .map(
          (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>RP ${item.price.toLocaleString("id-ID")}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeFromCart('${item.name}')">Hapus</button>
                    </div>
                </div>
            `,
        )
        .join("")
      cartTotalElement.style.display = "block"
    }
  }

  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div")
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #824c1e;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 5000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `
    notification.textContent = message
    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Hide notification
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Search functions
  function toggleSearch() {
    searchContainer.classList.toggle("active")
    if (searchContainer.classList.contains("active")) {
      searchInput.focus()
    }
  }

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim()
    if (query === "") {
      searchResults.innerHTML = "<p>Masukkan kata kunci untuk mencari...</p>"
      return
    }

    const results = products.filter(
      (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
    )

    if (results.length === 0) {
      searchResults.innerHTML = "<p>Tidak ada hasil yang ditemukan.</p>"
    } else {
      searchResults.innerHTML = results
        .map(
          (product) => `
            <div class="search-result-item">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">RP ${product.price.toLocaleString("id-ID")}</div>
                <div class="search-result-actions">
                    <button class="search-add-cart" onclick="addToCartFromSearch('${product.name}', ${product.price}, '${product.image}')">
                        Add to Cart
                    </button>
                    <button class="search-add-wishlist" onclick="addToWishlistFromSearch('${product.name}', ${product.price}, '${product.image}', '${product.description}')">
                        ♥ Wishlist
                    </button>
                </div>
            </div>
        `,
        )
        .join("")
    }

    searchModal.classList.add("active")
  }

  function addToCartFromSearch(name, price, image) {
    addToCart(name, price, image)
    searchModal.classList.remove("active")
  }

  function addToWishlistFromSearch(name, price, image, description) {
    addToWishlist(name, price, image, description)
  }

  // Wishlist functions
  function updateWishlistBadge() {
    wishlistBadge.textContent = wishlist.length
    wishlistBadge.style.display = wishlist.length > 0 ? "flex" : "none"
  }

  function addToWishlist(name, price, image, description) {
    const existingItem = wishlist.find((item) => item.name === name)

    if (!existingItem) {
      wishlist.push({ name, price, image, description })
      updateWishlistDisplay()
      updateWishlistBadge()
      showNotification(`${name} ditambahkan ke wishlist!`)

      // Update heart icon in menu
      updateHeartIcon(name, true)
    } else {
      showNotification(`${name} sudah ada di wishlist!`)
    }
  }

  function removeFromWishlist(name) {
    wishlist = wishlist.filter((item) => item.name !== name)
    updateWishlistDisplay()
    updateWishlistBadge()
    updateHeartIcon(name, false)
    showNotification(`${name} dihapus dari wishlist!`)
  }

  function updateWishlistDisplay() {
    if (wishlist.length === 0) {
      wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fa-solid fa-heart" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
                <p>Wishlist kosong</p>
            </div>
        `
    } else {
      wishlistItems.innerHTML = wishlist
        .map(
          (item) => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <h4>${item.name}</h4>
                    <p>RP ${item.price.toLocaleString("id-ID")}</p>
                    <div class="wishlist-actions">
                        <button class="add-to-cart-from-wishlist" onclick="addToCartFromWishlist('${item.name}', ${item.price}, '${item.image}')">
                            Add to Cart
                        </button>
                        <button class="remove-from-wishlist" onclick="removeFromWishlist('${item.name}')">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `,
        )
        .join("")
    }
  }

  function addToCartFromWishlist(name, price, image) {
    addToCart(name, price, image)
  }

  function updateHeartIcon(productName, isInWishlist) {
    const menuCards = document.querySelectorAll(".menu_card")
    menuCards.forEach((card) => {
      if (card.dataset.name === productName) {
        const heartIcon = card.querySelector(".small_card i")
        if (isInWishlist) {
          heartIcon.classList.add("active")
        } else {
          heartIcon.classList.remove("active")
        }
      }
    })
  }

  // Event listeners
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active")
  })

  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active")
  })

  // Add to cart event listeners
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const menuCard = btn.closest(".menu_card")
      const name = menuCard.dataset.name
      const price = menuCard.dataset.price
      const image = menuCard.dataset.image

      addToCart(name, price, image)
    })
  })

  // Checkout functionality
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return

    // Update order summary
    const summaryItems = document.getElementById("summary-items")
    summaryItems.innerHTML = cart
      .map(
        (item) => `
            <div class="summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>RP ${(item.price * item.quantity).toLocaleString("id-ID")}</span>
            </div>
        `,
      )
      .join("")

    checkoutModal.classList.add("active")
    cartSidebar.classList.remove("active")
  })

  // Payment method selection
  document.querySelectorAll(".payment-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".payment-option").forEach((opt) => opt.classList.remove("selected"))
      option.classList.add("selected")
      option.querySelector('input[type="radio"]').checked = true
    })
  })

  // Checkout actions
  document.getElementById("cancel-checkout").addEventListener("click", () => {
    checkoutModal.classList.remove("active")
  })

  document.getElementById("confirm-payment").addEventListener("click", () => {
    const selectedPayment = document.querySelector('input[name="payment"]:checked')

    if (!selectedPayment) {
      alert("Silakan pilih metode pembayaran!")
      return
    }

    // Simulate payment processing
    checkoutModal.classList.remove("active")
    successModal.classList.add("active")

    // Clear cart after successful payment
    cart = []
    updateCartDisplay()
    updateCartBadge()
    updateCartTotal()
  })

  document.getElementById("close-success").addEventListener("click", () => {
    successModal.classList.remove("active")
  })

  // Close modals when clicking outside
  checkoutModal.addEventListener("click", (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.remove("active")
    }
  })

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.classList.remove("active")
    }
  })

  // Event listeners for search
  searchToggle.addEventListener("click", toggleSearch)
  searchBtn.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  closeSearch.addEventListener("click", () => {
    searchModal.classList.remove("active")
  })

  // Event listeners for wishlist
  wishlistIcon.addEventListener("click", () => {
    wishlistSidebar.classList.add("active")
  })

  closeWishlist.addEventListener("click", () => {
    wishlistSidebar.classList.remove("active")
  })

  // Heart icon click handlers
  document.querySelectorAll(".small_card i").forEach((heartIcon) => {
    heartIcon.addEventListener("click", (e) => {
      e.preventDefault()
      const menuCard = heartIcon.closest(".menu_card")
      const name = menuCard.dataset.name
      const price = Number.parseInt(menuCard.dataset.price)
      const image = menuCard.dataset.image
      const description = menuCard.querySelector(".menu_info p").textContent

      if (heartIcon.classList.contains("active")) {
        removeFromWishlist(name)
      } else {
        addToWishlist(name, price, image, description)
      }
    })
  })

  // Close modals when clicking outside
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove("active")
    }
  })

  // Make functions global for onclick handlers
  window.updateQuantity = updateQuantity
  window.removeFromCart = removeFromCart

  // Make functions global
  window.addToCartFromSearch = addToCartFromSearch
  window.addToWishlistFromSearch = addToWishlistFromSearch
  window.addToCartFromWishlist = addToCartFromWishlist
  window.removeFromWishlist = removeFromWishlist

  // Original order form functionality
  function showError(input, message) {
    clearError(input)
    input.classList.add("error")

    const error = document.createElement("div")
    error.className = "error-message"
    error.innerText = message
    input.parentNode.appendChild(error)
  }

  function clearError(input) {
    input.classList.remove("error")
    const errorMsg = input.parentNode.querySelector(".error-message")
    if (errorMsg) {
      errorMsg.remove()
    }
  }

  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault()

      const name = document.querySelector("input[placeholder='you name']")
      const email = document.querySelector("input[placeholder='you email']")
      const number = document.querySelector("input[placeholder='you number']")
      const howMuch = document.querySelector("input[placeholder='how many order']")
      const orderName = document.querySelector("input[placeholder='bread name']")
      const address = document.querySelector("input[placeholder='you Address']")
      ;[name, email, number, howMuch, orderName, address].forEach(clearError)

      let isValid = true

      if (!name.value || /\d/.test(name.value)) {
        showError(name, "Nama harus diisi dan tidak boleh mengandung angka.")
        isValid = false
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.value || !emailPattern.test(email.value)) {
        showError(email, "Email tidak valid.")
        isValid = false
      }

      if (!number.value || isNaN(number.value)) {
        showError(number, "Nomor telepon hanya boleh angka.")
        isValid = false
      }

      if (!howMuch.value || isNaN(howMuch.value) || Number(howMuch.value) <= 0) {
        showError(howMuch, "Jumlah pesanan harus angka dan lebih dari 0.")
        isValid = false
      }

      if (!orderName.value) {
        showError(orderName, "Nama roti wajib diisi.")
        isValid = false
      }

      if (!address.value) {
        showError(address, "Alamat wajib diisi.")
        isValid = false
      }

      if (!isValid) return

      const orderData = {
        name: name.value,
        email: email.value,
        number: number.value,
        quantity: howMuch.value,
        order: orderName.value,
        address: address.value,
      }

      alert("Terima kasih " + orderData.name + ", pesanan roti Anda telah dikirim!")

      // Optional: Send to server
      fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((data) => console.log("Server response:", data))
        .catch((err) => console.error("Error:", err))
      ;[name, email, number, howMuch, orderName, address].forEach((input) => (input.value = ""))
    })
  }
})
