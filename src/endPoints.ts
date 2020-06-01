/**
 * Endpoint providing CSV of listed companies and their tickers
 */
export const asxCompaniesCsv = (): string => `https://www.asx.com.au/asx/research/ASXListedCompanies.csv`;

/**
 * Endpoint providing XLS spreadsheet of all listed securities and their tickers
 *
 * NOTE: the extension is xls but the file is actuall tab separated
 */
export const asxSecuritiesTsv = (): string => `https://www.asx.com.au/programs/ISIN.xls`;

/**
 * Endpoint to pull individual companies data
 */
export const asxCompanyJson = (ticker: string): string =>
  `https://www.asx.com.au/asx/1/company/${ticker.toUpperCase()}?fields=primary_share,latest_annual_reports,last_dividend,primary_share.indices`;

/**
 * Endpoint to pull individual securities data
 */
export const asxSingleJson = (ticker: string): string => `https://www.asx.com.au/asx/1/share/${ticker.toUpperCase()}`;

/**
 * Endpoint to pull annoucements
 */
export const asxAnnouncementsJson = (ticker: string): string =>
  `https://www.asx.com.au/asx/1/company/${ticker.toUpperCase()}/announcements?count=20&market_sensitive=true`;

/**
 * Endpoint for pulling historical ASX stock prices
 */
export const floatauHistoricalCsv = (ticker: string): string =>
  `http://float.com.au/download/${ticker.toUpperCase()}.csv?format=stockeasy`;
