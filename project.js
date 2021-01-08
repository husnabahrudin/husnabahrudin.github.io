new Vue({
    el: "#country",
    data: {
        countryData: [],
        countryObject: null,
        isHidden: false,
        hideGrid: false,
        searchParams: '',
        filterRegion: 'all'
    },
    watch: {
    	// for search country input
        searchParams: function(params) {
            fetch(`https://restcountries.eu/rest/v2/name/${params}`)
                .then(response => response.json())
                .then(data => {
                    this.countryData = data;
                })
        },
        // for filter by region
        filterRegion: function(region) {
        	let url = `https://restcountries.eu/rest/v2/region/${region}`
        	if (region == 'all') {
        		url = `https://restcountries.eu/rest/v2/all`
        	}
        	console.log(url)
            fetch(url) 
                .then(response => response.json())
                .then(data => {
                    this.countryData = data;
                })

        }
    },

    mounted() {
        this.getCountryData();
        this.toggleBodyClass('addClass', 'body');

    },
    methods: {
    	// for country list
        getCountryData() {
            fetch("https://restcountries.eu/rest/v2/all")
                .then(response => response.json())
                .then(data => {
                    this.countryData = data;
                })
        },
        // for detail page
        showCountryObject(param) {
            this.countryObject = param
            this.hideGrid = !this.hideGrid
            this.isHidden = !this.isHidden
        },
        // for border country
        showCountryObjectByCode(code) {
        	fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        		.then(response => response.json())
                .then(data => {
                    this.countryObject = data;
                })
        },
        
        toggleBodyClass(addRemoveClass, className) {
            const el = document.body;
            if (addRemoveClass === 'addClass') {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        },

    },



});