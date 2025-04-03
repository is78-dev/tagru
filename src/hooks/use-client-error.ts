import { toast } from "@/hooks/use-toast";

export const useClientError = () => {
  const clientErrorHandler = (error: unknown) => {
    if (error instanceof Error) {
      toast({
        variant: "destructive",
        title: "エラー",
        description: error.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "エラー",
        description: "予期せぬエラーが発生しました",
      });
    }
  };

  return { clientErrorHandler };
};
