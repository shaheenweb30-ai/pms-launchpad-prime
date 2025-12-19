import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { lang, switchLanguage } = useLanguageNavigation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {lang === 'ar' ? 'عربي' : 'English'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('ar')}>
          عربي
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;