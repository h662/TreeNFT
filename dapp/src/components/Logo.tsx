import { Flex } from "@chakra-ui/react";
import { FaTree } from "react-icons/fa6";

interface LogoProps {
  fontSize?: string;
}

function Logo({ fontSize = "2xl" }: LogoProps) {
  return (
    <Flex
      fontSize={fontSize}
      fontWeight="semibold"
      alignItems="center"
      gap={2}
      color="green.600"
    >
      <FaTree />
      Tree NFT
    </Flex>
  );
}

export default Logo;
