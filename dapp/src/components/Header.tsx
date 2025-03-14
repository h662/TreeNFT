import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import Logo from "./Logo";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

function Header({ signer, connectWallet, disconnectWallet }: HeaderProps) {
  return (
    <Box as="header" bgColor="blue.100" p={4}>
      <Flex
        maxW={1024}
        mx="auto"
        bgColor="red.100"
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo />
        <Box>
          {signer ? (
            <Text
              bgColor="green.300"
              px={2}
              py={1}
              cursor="pointer"
              onClick={disconnectWallet}
            >
              {signer.address.substring(0, 7)}...
              {signer.address.substring(signer.address.length - 5)}
            </Text>
          ) : (
            <Button colorPalette="green" onClick={connectWallet}>
              로그인
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
