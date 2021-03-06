export function loadStocks() {
  return function(dispatch) {
    dispatch({
      type: "LOAD_STOCKS",
    });
    fetch("/stock")
      .then((response) => {
        return response.json();
      })
      .then((stocks) => {
        dispatch(stocksLoaded(stocks));
        dispatch(loadPrices(stocks.map((s) => s.ticker)));
      });
  };
}

export function stocksLoaded(stocks) {
  return {
    type: "STOCKS_LOADED",
    value: stocks,
  };
}

export function createStock(stock) {
  return function(dispatch) {
    fetch("/stock", {
      method: "POST",
      body: JSON.stringify(stock),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((newStock) => {
        dispatch(stockCreated(newStock));
      });
  };
}

export function stockCreated(stock) {
  return {
    type: "STOCK_CREATED",
    value: stock,
  };
}

export function updateStock(stock) {
  return function(dispatch) {
    fetch("/stock", {
      method: "PUT",
      body: JSON.stringify(stock),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((newStock) => {
        dispatch(stockUpdated(newStock));
      });
  };
}

export function stockUpdated(stock) {
  return {
    type: "STOCK_UPDATED",
    value: stock,
  };  
}

export function deleteStock(stock) {
  return function(dispatch) {
    fetch("/stock/" + stock._id, {
      method: "DELETE",
    }).then(() => {
      dispatch(stockDeleted(stock.ticker));
    });
  };
}

export function stockDeleted(ticker) {
  return {
    type: "STOCK_DELETED",
    value: ticker,
  };
}

export function loadPrices(tickers) {
  return function(dispatch) {
    dispatch({
      type: "LOAD_PRICES",
    });
    const symbols = tickers.join(",");
    const uri = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote&filter=latestPrice,change,changePercent`;
    fetch(uri)
      .then((response) => {
        return response.json();
      })
      .then((prices) => {
        dispatch(pricesLoaded(prices));
      });
  };
}

export function pricesLoaded(prices) {
  return {
    type: "PRICES_LOADED",
    value: prices,
  };
}
