import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, AlertTriangle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/routes/routes";
import { useTranslation } from "react-i18next";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center grow bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border-red-200">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="flex justify-center mb-2">
            <Shield className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            {t('unauthorized.title')}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {t('unauthorized.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('unauthorized.alertTitle')}</AlertTitle>
            <AlertDescription>
              {t('unauthorized.alertDescription')}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4 pt-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            {t('unauthorized.goBack')}
          </Button>
          <Button
            variant="default"
            onClick={() => navigate(Routes.Home)}
            className=" bg-red-600 hover:bg-red-700"
          >
            <Home className="mr-2 h-4 w-4" />
            {t('unauthorized.home')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;
