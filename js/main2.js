let crypto = document.querySelector('data');

let request = new XMLHttpRequest();
var url = window.location;
var str_url = new URL(url);
var id = str_url.searchParams.get("id");
console.log(id);

request.open('GET', "https://api.coingecko.com/api/v3/coins/" + id + "");

request.send();

request.addEventListener('load', function () {
    // console.log(request.responseText);
    let crypt = JSON.parse(request.responseText);

    let cp = crypt.market_data.current_price.usd;
    let min = crypt.market_data.low_24h.usd;
    let max = crypt.market_data.high_24h.usd;
    let val = ((cp - min) * 100) / (max - min);
    //console.log(val);

    //console.log(crypt);

    let max_Supply = crypt.market_data.max_supply;
    console.log(max_Supply);


    var html = '';

    html += `
            <div class="display-data">
                        
                <p class="cap-rank">Rank #<span id="coidId">${crypt.market_cap_rank}</span></p>

                <div class="head-content">
                    <img src="${crypt.image.small}"><h2 id="coin"> ${crypt.name} <span id="symbol">${crypt.symbol}</span></h2>
                </div>

                <h2 id="price">${crypt.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD', })} 
                <span id="up"><span class="${(crypt.market_data.market_cap_change_percentage_24h < 0) ? 'red' : 'green'}"><i class="${(crypt.market_data.market_cap_change_percentage_24h < 0) ? 'fa-sharp fa-solid fa-caret-down' : 'fa-sharp fa-solid fa-caret-up'}"></i> ${crypt.market_data.market_cap_change_percentage_24h.toFixed(1)}%</span></span></h2>
                <p>${crypt.market_data.ath.btc} <span id="symbol">${crypt.symbol}</span>
                <span class="${(crypt.market_data.price_change_percentage_24h_in_currency.bits < 0) ? 'red' : 'green'}">${crypt.market_data.price_change_percentage_24h_in_currency.bits.toFixed(1)}%<i class="${(crypt.market_data.price_change_percentage_24h_in_currency.bits < 0) ? 'fa-solid fa-arrow-down' : 'fa-solid fa-arrow-up'}"></i></span></p>

                <div class="icons">
                    <div class="icon">
                        <i class="fa-solid fa-share"></i>
                     </div>
        
                    <div class="icon">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    
                    <div class="icon">
                        <i class="fa-solid fa-star"></i>
                    </div>

                    <div class="watchlist">
                        <p><i class="fa-solid fa-star"></i>On 12,25,000
                        Watchlists</p>
                    </div>
                </div>

                <div class="progress">
                    <div class="progress-bar" role="progressbar" id="progress"
                        aria-label="Basic example" style="width: ${val + "%"}"
                        aria-valuenow="25" aria-valuemin="0"
                        aria-valuemax="100">
                    </div>
                </div>
    
                <div class="progress_value">
                    <div>
                        <p>${crypt.market_data.low_24h.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD', })}</p>
                    </div>
                    <div>
                        <p>24h Range</p>
                    </div>
                    <div>
                        <p>${crypt.market_data.high_24h.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD', })}</p>
                    </div>
                </div>

                <div class="coin-detail">
                    
                    <div class="details">

                        <div class="detail mt-3">
                            <p class="m-0"><b>Market Cap </b>
                            <i class="fa-sharp fa-regular fa-circle-question"></i></p>
                            <p id="detail">
                                ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 12 }).format(crypt.market_data.market_cap.usd)}
                            </p>
                        </div>
                        <hr>
            
                        <div class="detail mt-3">
                            <p class="m-0"><b>24 Hour Trading Vol </b>
                            <i class="fa-sharp fa-regular fa-circle-question"></i></p>
                            <p id="detail">
                                ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 12 }).format(crypt.market_data.total_volume.usd)}
                            </p>
                        </div>
                        <hr>

                        <div class="detail mt-3">
                            <p class="m-0"><b>Fully Diluted Valuation </b>
                            <i class="fa-sharp fa-regular fa-circle-question"></i></p>
                            <p id="detail">
                                ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 12 }).format(crypt.market_data.fully_diluted_valuation.usd)}
                            </p>
                        </div>
                        <hr>
                        
                    </div>

                    <div class="details">
                        
                        <div class="detail mt-3">
                            <p class="m-0"><b>Circulating Supply </b>
                            <i class="fa-sharps fa-regular fa-circle-question"></i></p>
                            <p id="detail">
                                ${Intl.NumberFormat('en-IN', { maximumSignificantDigits: 12 }).format(crypt.market_data.circulating_supply)}
                            <i class="fa-sharp fa-regular fa-circle-question"></i></p>
                        </div>
                        <hr>
            
                        <div class="detail mt-3">
                            <p class="m-0"><b>Total Supply </b>
                            <i class="fa-sharp fa-regular fa-circle-question"></i></p>
                            <p id="detail">
                                ${Intl.NumberFormat('en-IN', { maximumSignificantDigits: 12 }).format(crypt.market_data.total_supply)}
                            </p>
                        </div>
                        <hr>
            
                        <div class="detail mt-3">
                            <p class="m-0"><b>Max Supply </b>
                            <i class="fa-sharp fa-regular fa-circle-question"></i></p>
                            <p id="detail">
                                ${(crypt.market_data.max_supply == null) ? '∞' : Intl.NumberFormat('en-IN', { maximumSignificantDigits: 12 }).format(max_Supply.toFixed(0))}
                            </p>
                        </div>
                        <hr>

                    </div>

                </div>

            </div> `;

    document.getElementById('data').innerHTML = html;

});
