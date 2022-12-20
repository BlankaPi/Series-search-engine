
window.onload = function () {
    showsApp.init();
}

let showsApp = {
    data: null,
    searchInput: null,
    showsDataSection: null,
    showBox: null,


    init: function () {
        console.log("app started");

        this.searchInput = document.getElementById("search-input");
        this.searchInput.addEventListener("keyup", (e) => {
            if (e.keyCode == 13) {
                console.log("enter clicked");
                this.loadData(this.searchInput.value);
            }
        });
                
        this.showBox = document.querySelectorAll(".show-box");
        console.log(this.showBox);

        this.showBox.forEach(element => {
            element.addEventListener("mouseover", (e) => {
                e.currentTarget[0].querySelector(".show-description").style.display = "none";
            });
        });

        this.showsDataSection = document.querySelector(".shows-data-section");
        this.loadData("friends");
    },

    loadData: function (str) {
        fetch("https://api.tvmaze.com/search/shows?q=" + str.trim())
            .then(responce => responce.json())
            .then(data => this.dataReady(data))
    },

    dataReady: function (showData) {
        this.data = showData;

        // console.log(showData);

        let allBoxesHtml = "";

        for (let i = 0; i < showData.length; i++) {
            let show = showData[i];
            show = show.show;
            console.log(show);

            let genres = show.genres.join(", ");
            let imgSrc = null;
            let imgSrcOriginal = null;
            if (show.image) {
                imgSrc = show.image.medium;
                imgSrcOriginal = show.image.original;
            } else {
                imgSrc = "https://cdn.pixabay.com/photo/2017/09/12/09/55/television-and-radio-2741800_960_720.jpg";
                imgSrcOriginal = "https://cdn.pixabay.com/photo/2017/09/12/09/55/television-and-radio-2741800_960_720.jpg";
            }

            let showTitle = null;
            if (!show.name) continue;
            showTitle = show.name;

            let network = "-";
            if (show.network) network = show.network.name;

            let officialSite = "-";
            if (show.officialSite) officialSite = show.officialSite;

            let premiered = "-";
            if (show.premiered) premiered = show.premiered;

            let websiteLink = null;
            if (show.url) websiteLink = show.url;

            let summary = show.summary;
            summary = `
                <p>Show: ${showTitle} </p>
                <p>Date: ${premiered} </p>
                <p>Network: ${network} </p>
                <a href="${websiteLink}">Link to website</a>
                <br>   
            ` + summary;

            allBoxesHtml += this.getShowBoxByTemplate(imgSrcOriginal,
                showTitle, genres, summary);
        }

        this.showsDataSection.innerHTML = allBoxesHtml;
    },

    getShowBoxByTemplate: function (imgSrc, title, genres, overview) {
        return `
            <div class="show-box">
                <img src="${imgSrc}" alt="">
                 <div class="show-description">
                    <div class="show-title">${title}</div>
                    <div class="show-genres">${genres}</div>
                </div>
                <div class="show-overview">${overview}</div>
            </div>`;
    }


};