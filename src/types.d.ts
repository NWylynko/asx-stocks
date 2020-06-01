interface Company {
  ticker: string;
  name: string;
  gicsIndustry: string;
}

interface Security {
  ticker: string;
  name: string;
  type: string;
  isin: string;
}

interface LatestAnnualReport {
  id: string;
  document_release_date: Date;
  document_date: Date;
  url: string;
  relative_url: string;
  header: string;
  market_sensitive: boolean;
  number_of_pages: number;
  size: string;
  legacy_announcement: boolean;
}

interface RawIndices {
  index_code: string;
  name_full: string;
  name_short: string;
  name_abrev: string;
}

interface RawPrimaryShare {
  code: string;
  isin_code: string;
  desc_full: string;
  last_price: number;
  open_price: number;
  day_high_price: number;
  day_low_price: number;
  change_price: number;
  change_in_percent: string;
  volume: number;
  bid_price: number;
  offer_price: number;
  previous_close_price: number;
  previous_day_percentage_change: string;
  year_high_price: number;
  last_trade_date: Date;
  year_high_date: Date;
  year_low_price: number;
  year_low_date: Date;
  year_open_price?: Date;
  pe: number;
  eps: number;
  average_daily_volume: number;
  annual_dividend_yield: number;
  market_cap: number;
  number_of_shares: number;
  deprecated_market_cap: number;
  deprecated_number_of_shares: number;
  suspended: boolean;
  indices: RawIndices[];
  year_change_price?: number;
  year_change_in_percentage?: string;
}

interface RawLastDividend {
  created_date: Date;
  ex_date: Date;
  payable_date: Date;
  record_date: Date;
  amount: number;
  raw_franked_percentage: number;
  franked_percentage: string;
  type: string;
  comments: string;
  asx_code: string;
  books_close_date: Date;
  company_name_abbrev: string;
}

interface RawCompanyInfo {
  code: string;
  name_full: string;
  name_short: string;
  name_abbrev: string;
  principal_activities: string;
  industry_group_name: string;
  sector_name: string;
  listing_date: Date;
  delisting_date?: Date | null | undefined;
  web_address: string;
  mailing_address: string;
  phone_number: string;
  fax_number: string;
  registry_name: string;
  registry_address: string;
  registry_phone_number: string;
  foreign_exempt: boolean;
  investor_relations_email: string;
  investor_relations_url: string;
  fiscal_year_end: string;
  logo_image_url: string;
  primary_share_code: string;
  recent_announcement: boolean;
  products: string[];
  latest_annual_reports: LatestAnnualReport[];
  primary_share: RawPrimaryShare;
  last_dividend: RawLastDividend;
}

interface CompanyInfo {
  ticker: string;
  name: string;
  nameShort: string;
  principalActivities: string;
  gicsIndustry: string;
  gicsSector: string;
  listingDate: Date;
  delistingDate: Date | null | undefined;
  website: string;
  mailingAddress: string;
  phoneNumber: string;
  faxNumber: string;
  registryName: string;
  registryAddress: string;
  registryPhoneNumber: string;
  foreignExempt: boolean;
  products: string[];
  lastDividend: DividendInfo;
  primaryShare?: PrimaryShare;
}

interface DividendInfo {
  type: string;
  createdDate: Date;
  exDate: Date;
  payableDate: Date;
  recordDate: Date;
  booksCloseDate: Date;
  amountAud: number;
  frankedPercent: number;
  comments: string;
}

interface PrimaryShare {
  ticker: string;
  isin: string;
  type: string;
  openPrice: number;
  lastPrice: number;
  bidPrice: number;
  offerPrice: number;
  lastTradeDate: Date;
  dayHighPrice: number;
  dayLowPrice: number;
  dayChangePrice: number;
  dayChangePercent: string;
  dayVolume: number;
  prevDayClosePrice: number;
  prevDayChangePercent: string;
  yearHighPrice: number;
  yearHighDate: Date;
  yearLowPrice: number;
  yearLowDate: Date;
  yearOpenPrice: Date | undefined;
  yearChangePrice: number | undefined;
  yearChangePercent: string | undefined;
  averageDailyVolume: number;
  pe: number;
  eps: number;
  annualDividentYield: number;
  securitiesOutstanding: number;
  marketCap: number;
  isSuspended: boolean;
  securityInfo: Index[];
}

interface Index {
  code: string;
  name: string;
}

interface RawAnnouncement {
  id: string;
  document_release_date: Date;
  document_date: Date;
  url: string;
  relative_url: string;
  header: string;
  market_sensitive: boolean;
  number_of_pages: number;
  size: string;
  legacy_announcement: boolean;
}

interface Announcement {
  url: string;
  title: string;
  documentDate: Date;
  releaseDate: Date;
  numPages: number;
  size: string;
}
