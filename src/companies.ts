import fetch from 'node-fetch';
import { csvParser, removeLinesFromStart } from './tools';

import { _normaliseSecurityInfo, getSecurityInfo } from './securities';
import { asxCompaniesCsv, asxCompanyJson, asxAnnouncementsJson } from './endPoints';

/**
 * Pulls a list of all companies listed on the ASX.  This will not include
 * anything other than companies, i.e. no EFT/ETPs, options, warrants etc.
 */
export const getListedCompanies = async (): Promise<Company[]> => {
  try {
    // fetch the csv
    const res = await fetch(asxCompaniesCsv());
    // get the text from the request
    let text = await res.text();
    // the first two lines are not needed
    text = await removeLinesFromStart(text, 2);
    // parse csv file
    const companies = await csvParser(text);

    return companies.map((company) => {
      return {
        name: company[0],
        ticker: company[1],
        gicsIndustry: company[2],
      };
    });
  } catch (error) {
    throw new Error('Failed to fetch companies');
  }
};

/**
 * Normalise dividend info as part of getCompanyInfo()
 */
const _normaliseShareDividendInfo = async (raw: RawLastDividend): Promise<DividendInfo | {}> => {
  if (!raw) {
    return {};
  }
  return {
    type: raw.type,
    createdDate: raw.created_date,
    exDate: raw.ex_date,
    payableDate: raw.payable_date,
    recordDate: raw.record_date,
    booksCloseDate: raw.books_close_date,
    amountAud: raw.amount,
    frankedPercent: raw.raw_franked_percentage,
    comments: raw.comments,
  };
};

/**
 * Normalise the basic company info as part of getCompanyInfo()
 */
const _normaliseCompanyInfo = async (raw: RawCompanyInfo): Promise<CompanyInfo> => {
  return {
    ticker: raw.code,
    name: raw.name_full,
    nameShort: raw.name_abbrev,
    principalActivities: raw.principal_activities,
    gicsIndustry: raw.industry_group_name,
    gicsSector: raw.sector_name,
    listingDate: raw.listing_date,
    delistingDate: raw.delisting_date,
    website: raw.web_address,
    mailingAddress: raw.mailing_address,
    phoneNumber: raw.phone_number,
    faxNumber: raw.fax_number,
    registryName: raw.registry_name,
    registryAddress: raw.registry_address,
    registryPhoneNumber: raw.registry_phone_number,
    foreignExempt: raw.foreign_exempt,
    products: raw.products,

    lastDividend: await _normaliseShareDividendInfo(raw.last_dividend),
  };
};

/**
 * Pull information on the company with the given ticker symbol. This also
 *
 * includes all of the pricing information returned by
 * `asx.data.securities.getSecurityInfo()`.
 *
 * This will only work for a company, it will not return information on, ETFs,
 * warrants, indices etc. For that please use
 * `asx.data.securities.getSecurityInfo()`
 * @param {string} ticker The ticker symbol of the company to lookup.
 */
export const getCompanyInfo = async (ticker: string): Promise<CompanyInfo> => {
  if (ticker.length < 3) throw new Error('not a valid ticker');

  // fetch the json
  const res = await fetch(asxCompanyJson(ticker));

  if (res.status !== 200) {
    if (res.status === 404) {
      throw new Error(`Unknown company ticker ${ticker}`);
    }

    throw new Error(`Failed to lookup company info for ${ticker}; HTTP status ${res.status}`);
  }

  // get the json from the request
  const rawInfo: RawCompanyInfo = await res.json();

  const companyInfo: CompanyInfo = await _normaliseCompanyInfo(rawInfo);

  let shareInfo: PrimaryShare;

  if (rawInfo.primary_share) {
    shareInfo = await _normaliseSecurityInfo(rawInfo.primary_share);
  } else {
    shareInfo = await getSecurityInfo(ticker);
  }

  companyInfo.primaryShare = shareInfo;

  return companyInfo;
};

/**
 * Normalise the annoucements data pulled via get_company_annoucements()
 */
const _normaliseAnnoucements = async (rawAnnoucements: RawAnnouncement[]): Promise<Announcement[]> => {
  if (!rawAnnoucements) {
    return [];
  }
  return rawAnnoucements.map((raw) => {
    return {
      url: raw.url,
      title: raw.header,
      documentDate: raw.document_date,
      releaseDate: raw.document_release_date,
      numPages: raw.number_of_pages,
      size: raw.size,
    };
  });
};

/**
 * Pull the latest company announcements for the company with the given ticker
 * symbol. This will only work for companies, it won't work for other securities.
 *
 * NOTE: This currently only pulls the 20 latest _market sensitive_ announcements.
 * @param {string} ticker The ticker symbol of the company to pull annoucements for.
 */
export const getCompanyAnnouncements = async (ticker: string): Promise<Announcement[]> => {
  if (ticker.length < 3) throw new Error('not a ticker');

  // fetch the json
  const res = await fetch(asxAnnouncementsJson(ticker));

  if (res.status !== 200) {
    if (res.status === 404) {
      throw new Error(`Unknown company ticker ${ticker}`);
    }

    throw new Error(`Failed to lookup company announcements for ${ticker}; HTTP status ${res.status}`);
  }

  const rawAnnouncements = await res.json();
  const rawAnnouncementsData: RawAnnouncement[] = rawAnnouncements.data;

  const announcements: Announcement[] = await _normaliseAnnoucements(rawAnnouncementsData);

  return announcements;
};
