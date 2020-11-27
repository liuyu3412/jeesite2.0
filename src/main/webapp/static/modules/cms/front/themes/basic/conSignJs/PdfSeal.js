function BCPdfView(pdfobj) {

    this.pdfObject = pdfobj;  

}

BCPdfView.prototype = {

    load: function (url) {   

        this.pdfObject.load(url);

    },

    save: function(url){   

        this.pdfObject.save(url);

    },

    saveAsBase64: function () {  

        return this.pdfObject.save("base64");

    },

    signSeal: function (param) {  

        if (arguments.length > 0) {

            this.pdfObject.stamp(param);

        } else {

            this.pdfObject.stamp();

        }

    },

    listSeals: function () { 

        return this.pdfObject.listSeals();

    },

    setProperties: function (arrProperties) { 

        this.pdfObject.setProperties(arrProperties);

    },

    isSigned:function(){  

        return this.pdfObject.isSigned();

    },

    print: function () {  

        this.pdfObject.print();

    },

    exPrint: function(){
        this.pdfObject.exPrint();
    },

    setPrintCount: function(){
        return this.pdfObject.setControlPrintCount();
    },

    getPageCount:function(){   

        return this.pdfObject.getPageCount();

    },

    gotoPage: function (pageIndex) {  

        this.pdfObject.goToPage(pageIndex);

    },

    search: function (content) {  

        return this.pdfObject.searchText(content);

    },
	
	hideMenu: function(){
		this.pdfObject.hideMenu();
	},
	
	showMenu: function(){
		this.pdfObject.showMenu();
	},
	
	multiStamp: function(){
		this.pdfObject.multiStamp();
	},
	
	keywordSearch: function(){
		this.pdfObject.keywordSearch();
	},
	
	handWritting: function(){
		this.pdfObject.handWritting();
	},
	
	verifySeal: function(){
		this.pdfObject.verifySeal();
	},
	
	removeSeal: function(){
		this.pdfObject.removeSeal();
	},
	ridingStamp: function(){
		this.pdfObject.ridingStamp();
	}

};