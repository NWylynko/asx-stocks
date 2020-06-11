import fetch from 'node-fetch';
import { asxSingleJson, asxSecuritiesTsv } from './endPoints';
import { xlsxParser } from './tools';

/**
 * Pulls a list of all securities listed on the ASX.
 */
export const getListedSecurities = async (): Promise<Security[]> => {
  try {
    // fetch the csv
    const res = await fetch(asxSecuritiesTsv());

    const securitiesData = await xlsxParser(await res.buffer());

    const securities = securitiesData.sheetName;
    securities.splice(0, 5);

    return securities.map((security: any[]) => {
      return {
        ticker: security[0],
        name: security[1],
        type: security[2],
        isin: security[3],
      };
    });
  } catch (error) {
    throw new Error('Failed to fetch securities');
  }
};

/**
 * Normalise security indicies list as part of getSecurityInfo()
 * @internal
 */
const _normaliseSecurityIndicesInfo = async (raw: RawIndices[]): Promise<Index[]> => {
  if (!raw) {
    return [];
  }
  return raw.map((index) => {
    return {
      code: index.index_code,
      name: index.name_full,
    };
  });
};

/**
 * Normalise the share info returned from ASX, ensure missing fields are
 * always present, cleanup names etc.
 * @internal
 */
export const _normaliseSecurityInfo = async (raw: RawPrimaryShare): Promise<PrimaryShare> => {
  return {
    ticker: raw.code,
    isin: raw.isin_code,
    type: raw.desc_full,
    openPrice: raw.open_price,
    lastPrice: raw.last_price,
    bidPrice: raw.bid_price,
    offerPrice: raw.offer_price,
    lastTradeDate: raw.last_trade_date,
    dayHighPrice: raw.day_high_price,
    dayLowPrice: raw.day_low_price,
    dayChangePrice: raw.change_price,
    dayChangePercent: raw.change_in_percent,
    dayVolume: raw.volume,
    prevDayClosePrice: raw.previous_close_price,
    prevDayChangePercent: raw.previous_day_percentage_change,
    yearHighPrice: raw.year_high_price,
    yearHighDate: raw.year_high_date,
    yearLowPrice: raw.year_low_price,
    yearLowDate: raw.year_low_date,
    yearOpenPrice: raw.year_open_price,
    yearChangePrice: raw.year_change_price,
    yearChangePercent: raw.year_change_in_percentage,
    averageDailyVolume: raw.average_daily_volume,
    pe: raw.pe,
    eps: raw.eps,
    annualDividentYield: raw.annual_dividend_yield,
    securitiesOutstanding: raw.number_of_shares,
    marketCap: raw.market_cap,
    isSuspended: raw.suspended,

    securityInfo: await _normaliseSecurityIndicesInfo(raw.indices),
  };
};

/**
 * Pull pricing information on the security with the given ticker symbol. This
 * can be for any type of listed security, such as company stock, bonds, ETFs
 * etc.
 *
 * @param {string} ticker The ticker symbol of the security to lookup.
 */
export const getSecurityInfo = async (ticker: string): Promise<PrimaryShare> => {
  const res = await fetch(asxSingleJson(ticker));

  if (res.status !== 200) {
    if (res.status === 404) {
      throw new Error(`Unknown security ticker ${ticker}`);
    }

    throw new Error(`Failed to lookup security ticker for ${ticker}; HTTP status ${res.status}`);
  }

  const rawInfo: RawPrimaryShare = await res.json();

  const securityInfo: PrimaryShare = await _normaliseSecurityInfo(rawInfo);

  return securityInfo;
};
