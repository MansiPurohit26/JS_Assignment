$(document).ready(function () {
    $('#crypto-table').DataTable();
});

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true").then((result) => {
    console.log(result) //json formet
    return result.json(); //converted to object
})
    .then((objectData) => {
        console.log(objectData);
        $(document).ready(function () {
            $('#crypto-table').DataTable();
        });
       
        let tableData = "";
        objectData.forEach((item, i) => {
            tableData += `  
                        <tr>
                        <td><i class="fa-regular fa-star"></i><span class="id"> ${i + 1}</span></td> 
                        <td><img src="${item.image}"><a href="details.html?id=${item.id}"><span class="name"><b>${item.name}</b></span><span class="symbol">${item.symbol}</span></a></td>  
                        <td>${ Intl.NumberFormat('en-IN', {style: 'currency',currency: 'USD',  }).format(item.current_price)}</td>
                        <td><p class="${(item.price_change_percentage_24h < 0) ? 'red' : 'green'}">${item.price_change_percentage_24h.toFixed(1)}%</p></td>  
                        <td><p class="${(item.market_cap_change_percentage_24h < 0) ? 'red' : 'green'}">${item.market_cap_change_percentage_24h.toFixed(1)}%</p></td>           
                        <td>${Intl.NumberFormat('en-IN', {style: 'currency',currency: 'USD',maximumSignificantDigits: 12,}).format(item.total_volume)}</td>           
                        <td>${Intl.NumberFormat('en-IN', {style: 'currency',currency: 'USD',maximumSignificantDigits: 12,}).format(item.market_cap)}</td>           
                        </tr>`;
        });
        // console.log(table-data);
        document.getElementById("table-data").innerHTML = tableData;
    }).catch((err) => {
        console.log(err);
    })
    
    