import * as apiData from "../utils/data.json";
import { useState, useEffect } from "react";
import { assetOrder, assetColors, sortMap } from "../utils/Constants";

const Table = () => {
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    processData();
  }, []);

  /**
   * Transforms data into final shape. Would usually use an
   * axios request here to fetch data from server side
   */
  const processData = () => {
    const newData = apiData.default;
    if (newData.length > 0) {
      newData.forEach((item) => {
        item.order = assetOrder[item.assetClass];
      });
      newData.sort(
        (a, b) =>
          a.order - b.order ||
          b.price - a.price ||
          a.ticker.localeCompare(b.ticker)
      );
      setData(newData);
      setDefaultData(newData);
    }
  };

  /**
   * Sorts the table by asset class in the custom order
   */
  const sortByAssetClass = () => {
    if (sort === "assetClass") {
      setData(defaultData);
      setSort("");
    } else {
      const newData = Object.assign([], data);
      newData.sort((a, b) => a.order - b.order);
      setData(newData);
      setSort("assetClass");
    }
  };

  /**
   * Sorts the table by price in descending order
   */
  const sortByPrice = () => {
    if (sort === "price") {
      setData(defaultData);
      setSort("");
    } else {
      const newData = Object.assign([], data);
      newData.sort((a, b) => b.price - a.price);
      setData(newData);
      setSort("price");
    }
  };

  /**
   * Sorts the table by ticker in alphabetical order
   */
  const sortByTicker = () => {
    if (sort === "ticker") {
      setData(defaultData);
      setSort("");
    } else {
      const newData = Object.assign([], data);
      newData.sort((a, b) => a.ticker.localeCompare(b.ticker));
      setData(newData);
      setSort("ticker");
    }
  };

  /**
   * Creates the headers for the table
   * @returns the table head component
   */
  const TableHead = () => {
    return (
      <thead data-testid="table-head" className="table-head pointer">
        <tr>
          <th
            data-testid="ticker-head"
            onClick={sortByTicker}
            style={{ backgroundColor: sort === "ticker" ? "#FFD70080" : "" }}
          >
            Ticker
          </th>
          <th
            data-testid="price-head"
            onClick={sortByPrice}
            style={{ backgroundColor: sort === "price" ? "#FFD70080" : "" }}
          >
            Price
          </th>
          <th
            data-testid="assetclass-head"
            onClick={sortByAssetClass}
            style={{ backgroundColor: sort === "assetClass" ? "#FFD70080" : ""}}
          >
            Asset Class
          </th>
        </tr>
      </thead>
    );
  };

  /**
   * Creates the data rows for the table
   * @returns the table body component
   */
  const TableBody = () => {
    return (
      <tbody data-testid="table-body" className="table-body">
        {data.map((item, i) => {
          const { ticker, price, assetClass } = item;
          return (
            <tr
              id={`${ticker}_${price}_${assetClass}_${i}`}
              key={`${ticker}_${price}_${assetClass}_${i}`}
              data-testid="data-row"
            >
              <td style={{ backgroundColor: assetColors[assetClass] }}>
                {ticker}
              </td>
              <td
                style={{
                  backgroundColor: price > 0 ? "#0000FF80" : "#FF000080",
                }}
              >
                {price}
              </td>
              <td style={{ backgroundColor: assetColors[assetClass] }}>
                {assetClass}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  if (data.length > 0) {
    return (
      <>
        <strong>
          Active Sort:{" "}
          {sort.length > 0 ? sortMap[sort] : "Default (inner sort)"}
        </strong>
        <table cellSpacing={0} className="table-container">
          <TableHead />
          <TableBody />
        </table>
      </>
    );
  } else {
    { /** Would add loading symbol here */ }
    return "data not available";
  }
};

export default Table;
