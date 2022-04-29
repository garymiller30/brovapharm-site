import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface useToastHookProps {
  message?: string;
  status?: "info" | "warning" | "success" | "error" | undefined;
}

export function useToastHook<useToastHookProps>() {
  const [state, setState] = useState<useToastHookProps | undefined>();
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const { message, status } = state;

      toast({
        title: status,
        description: message,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    }
  }, [state, toast]);

  return [state, setState];
}
