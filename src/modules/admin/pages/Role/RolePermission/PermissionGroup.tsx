import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface PermissionGroupProps {
  title: string;
  children: React.ReactNode;
  isParent?: boolean;
}

const PermissionGroup: React.FC<PermissionGroupProps> = ({
  title,
  children,
  isParent = false,
}) => {
  return (
    <Card className={`${isParent ? "mb-6" : "mb-4"}`}>
      <CardHeader className={`pb-2 ${isParent ? "bg-secondary/20" : ""}`}>
        <CardTitle className={`${isParent ? "text-xl" : "text-md"}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default PermissionGroup;
