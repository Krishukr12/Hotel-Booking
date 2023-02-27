import { useToast } from "@chakra-ui/react";
export const useCustomToast = () => {
  const toast = useToast({
    position: "top",
    title: "Container style is updated",
    containerStyle: {
      width: "200px",
      maxWidth: "100%",
      isClosable: true,
    },
  });
  const ShowCustomeToast = (message) => {
    toast({
      title: `${message}`,
      isClosable: true,
      status: "error",
      duration: 2000,
      variant: "",
    });
  };

  return { ShowCustomeToast };
};
