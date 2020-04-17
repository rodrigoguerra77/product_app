Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
            <a v-bind:href="url">
                <img v-bind:src="image" v-bind:alt="altText">
            </a>
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>

            <p>The best {{ product }} in the world!</p>

            <p v-if="inStock > 10">In Stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
            <p v-else
                :class="{ lineThrough: !inStock}"
                >Out of stock</p>
            <p>Shipping: {{ shipping }}</p>
            <span>{{ sale }}</span>

            <product-details :details="details"></product-details>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)">
                
            </div>

            <div>
                <p>Sizes:</p>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
            </div>

            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock}"
                    >Add to Cart</button>
            
            <button v-on:click="removeToCart"
                    :disabled="cart == 0"
                    :class="{ disabledButton: cart == 0}"
                    >Remove to Cart</button>

            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>

        </div>

    </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            altText: 'A pair of socks',
            url: 'http://www.google.com',
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green.png",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.png",
                    variantQuantity: 0
                }
            ],
            sizes: ['small', 'medium', 'large', 'extra large'],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        removeToCart() {
            if(this.cart > 0){
                this.cart -= 1
            }
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if(this.onSale){
                return this.brand + ' ' + this.product + ' are on sale!'
            } else {
                return this.brand + ' ' + this.product + ' are not on sale!'
            }
        },
        shipping() {
            if(this.premium){
                return 'Free'
            }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})