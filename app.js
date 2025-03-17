new Vue({
    el: '#app',
    data: {
        showDetail: false,
        selectedQty: 1,
        categories: ['Electronic product', 'Household product', 'Beauty'],
        products: mockProducts,
        currentProduct: {},
        cart: [],
        showCart: false,
        loading: false,
        searchQuery: '',
        selectedCategory: null,
        hotDeals: [
            {
                id: 'Coffee-cup-1',
                type: 'coffee-cup',
                name: 'Fine Coffee Cups',
                price: 39.9,
                originalPrice: 99,
                discount: 60,
                image: './pics/c2.jpg',
                imageClass: 'coffee-size',
                description: 'High quality porcelain coffee,150ml,made in China'
            },
            {
                id: 'deal-2',
                name: 'Fashion Sports Socks',
                price: 49.9,
                originalPrice: 129,
                discount: 61,
                image: './pics/socks.jpg',
                imageClass: 'other-product-size'
            },
            {
                id: 'deal-3',
                name: 'Smart Watch',
                price: 299,
                originalPrice: 599,
                discount: 50,
                image: './pics/watch.jpg',
                imageClass: 'other-product-size'
            },
            {
                id: 'deal-4',
                name: 'Wirelss Earphone',
                price: 199,
                originalPrice: 399,
                discount: 50,
                image: './pics/earphone.jpg',
                imageClass: 'other-product-size'
            },
      
        ]
    },
    computed: {
        filteredProducts() {
            return this.products.filter(product => {
                const matchCategory = !this.selectedCategory || 
                    product.category === this.selectedCategory;
                const matchSearch = product.name.includes(this.searchQuery);
                return matchCategory && matchSearch;
            });
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + item.quantity, 0);
        },
        totalPrice() {
            return this.cart.reduce((sum, item) => 
                sum + (item.product.price * item.quantity), 0).toFixed(2);
        }
    },
    methods: {
        showProductDetail(product) {
            console.log('Clicked product:', product);
            if (product.type === 'coffee-cup') {
                window.location.href = 'coffee-detail.html';
            } else {
                this.currentProduct = product;
                this.showDetail = true;
            }
        },
        addToCart(product) {
            const existing = this.cart.find(item => 
                item.product.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                this.cart.push({
                    product: product,
                    quantity: 1
                });
            }
            alert('Add to cart');
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        },
        async checkout() {
            this.loading = true;
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.loading = false;
            alert('Successful settlement');
            this.cart = [];
            this.showCart = false;
        }
    },
    created() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 800);
    }
}); 


// User Behavior Statistics
window.trackData = {
  clickCount: 0,
  enterTime: new Date().getTime(),
  stayDuration: 0
};

// Click event listener
document.addEventListener('click', () => {
  trackData.clickCount++;
  localStorage.setItem('userBehavior', JSON.stringify(trackData));
});

// Calculation of length of stay
window.addEventListener('beforeunload', () => {
  trackData.stayDuration = new Date().getTime() - trackData.enterTime;
  localStorage.setItem('userBehavior', JSON.stringify(trackData));
});