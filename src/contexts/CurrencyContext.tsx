import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface Currency {
  code: string;
  symbol: string;
  symbolArabic: string;
  name: string;
  nameArabic: string;
  position: 'before' | 'after';
  decimalPlaces: number;
  thousandSeparator: string;
  decimalSeparator: string;
}

export const currencies: Record<string, Currency> = {
  USD: {
    code: 'USD',
    symbol: '$',
    symbolArabic: '$',
    name: 'US Dollar',
    nameArabic: 'الدولار الأمريكي',
    position: 'before',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    symbolArabic: '€',
    name: 'Euro',
    nameArabic: 'اليورو',
    position: 'before',
    decimalPlaces: 2,
    thousandSeparator: '.',
    decimalSeparator: ','
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    symbolArabic: '£',
    name: 'British Pound',
    nameArabic: 'الجنيه الإسترليني',
    position: 'before',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    symbolArabic: '¥',
    name: 'Japanese Yen',
    nameArabic: 'الين الياباني',
    position: 'before',
    decimalPlaces: 0,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    symbolArabic: 'C$',
    name: 'Canadian Dollar',
    nameArabic: 'الدولار الكندي',
    position: 'before',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    symbolArabic: 'A$',
    name: 'Australian Dollar',
    nameArabic: 'الدولار الأسترالي',
    position: 'before',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF',
    symbolArabic: 'CHF',
    name: 'Swiss Franc',
    nameArabic: 'الفرنك السويسري',
    position: 'after',
    decimalPlaces: 2,
    thousandSeparator: "'",
    decimalSeparator: '.'
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    symbolArabic: '¥',
    name: 'Chinese Yuan',
    nameArabic: 'اليوان الصيني',
    position: 'before',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    symbolArabic: '₹',
    name: 'Indian Rupee',
    nameArabic: 'الروبية الهندية',
    position: 'before',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    symbolArabic: 'د.إ',
    name: 'UAE Dirham',
    nameArabic: 'الدرهم الإماراتي',
    position: 'after',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  SAR: {
    code: 'SAR',
    symbol: 'ر.س',
    symbolArabic: 'ر.س',
    name: 'Saudi Riyal',
    nameArabic: 'الريال السعودي',
    position: 'after',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  QAR: {
    code: 'QAR',
    symbol: 'ر.ق',
    symbolArabic: 'ر.ق',
    name: 'Qatari Riyal',
    nameArabic: 'الريال القطري',
    position: 'after',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  KWD: {
    code: 'KWD',
    symbol: 'د.ك',
    symbolArabic: 'د.ك',
    name: 'Kuwaiti Dinar',
    nameArabic: 'الدينار الكويتي',
    position: 'after',
    decimalPlaces: 3,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  BHD: {
    code: 'BHD',
    symbol: 'د.ب',
    symbolArabic: 'د.ب',
    name: 'Bahraini Dinar',
    nameArabic: 'الدينار البحريني',
    position: 'after',
    decimalPlaces: 3,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  OMR: {
    code: 'OMR',
    symbol: 'ر.ع',
    symbolArabic: 'ر.ع',
    name: 'Omani Rial',
    nameArabic: 'الريال العماني',
    position: 'after',
    decimalPlaces: 3,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  JOD: {
    code: 'JOD',
    symbol: 'د.أ',
    symbolArabic: 'د.أ',
    name: 'Jordanian Dinar',
    nameArabic: 'الدينار الأردني',
    position: 'after',
    decimalPlaces: 3,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  EGP: {
    code: 'EGP',
    symbol: 'ج.م',
    symbolArabic: 'ج.م',
    name: 'Egyptian Pound',
    nameArabic: 'الجنيه المصري',
    position: 'after',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  MAD: {
    code: 'MAD',
    symbol: 'د.م.',
    symbolArabic: 'د.م.',
    name: 'Moroccan Dirham',
    nameArabic: 'الدرهم المغربي',
    position: 'after',
    decimalPlaces: 2,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  TND: {
    code: 'TND',
    symbol: 'د.ت',
    symbolArabic: 'د.ت',
    name: 'Tunisian Dinar',
    nameArabic: 'الدينار التونسي',
    position: 'after',
    decimalPlaces: 3,
    thousandSeparator: ',',
    decimalSeparator: '.'
  },
  LYD: {
    code: 'LYD',
    symbol: 'د.ل',
    symbolArabic: 'د.ل',
    name: 'Libyan Dinar',
    nameArabic: 'الدينار الليبي',
    position: 'after',
    decimalPlaces: 3,
    thousandSeparator: ',',
    decimalSeparator: '.'
  }
};

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number, showSymbol?: boolean, language?: string) => string;
  getCurrencySymbol: (language?: string) => string;
  getCurrencyName: (language?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies.USD);

  // Load saved currency preference on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency && currencies[savedCurrency]) {
      setSelectedCurrency(currencies[savedCurrency]);
    }
  }, []);

  // Save currency preference when it changes
  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('preferredCurrency', currency.code);
  };

  // Format currency amount based on selected currency and language
  const formatCurrency = (amount: number, showSymbol: boolean = true, language: string = i18n.language): string => {
    const { position, decimalPlaces, thousandSeparator, decimalSeparator } = selectedCurrency;
    const symbol = language === 'ar' ? selectedCurrency.symbolArabic : selectedCurrency.symbol;
    
    // Format the number
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping: true
    }).format(amount);

    // Replace separators based on currency preferences
    let result = formattedNumber
      .replace(/,/g, thousandSeparator)
      .replace(/\./g, decimalSeparator);

    // Add currency symbol
    if (showSymbol) {
      if (position === 'before') {
        result = `${symbol}${result}`;
      } else {
        result = `${result} ${symbol}`;
      }
    }

    return result;
  };

  // Get currency symbol based on language
  const getCurrencySymbol = (language: string = i18n.language): string => {
    return language === 'ar' ? selectedCurrency.symbolArabic : selectedCurrency.symbol;
  };

  // Get currency name based on language
  const getCurrencyName = (language: string = i18n.language): string => {
    return language === 'ar' ? selectedCurrency.nameArabic : selectedCurrency.name;
  };

  const value: CurrencyContextType = {
    selectedCurrency,
    setSelectedCurrency: handleCurrencyChange,
    formatCurrency,
    getCurrencySymbol,
    getCurrencyName
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
