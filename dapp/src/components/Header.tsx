import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ethers, JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";
import { FaTree } from "react-icons/fa6";

function Header() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask가 설치되어 있지 않습니다.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box as="header" bgColor="blue.100" p={4}>
      <Flex
        maxW={1024}
        mx="auto"
        bgColor="red.100"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          fontSize="2xl"
          fontWeight="semibold"
          alignItems="center"
          gap={2}
          color="green.600"
        >
          <FaTree />
          Tree NFT
        </Flex>
        <Box>
          {signer ? (
            <Text
              bgColor="green.300"
              px={2}
              py={1}
              cursor="pointer"
              onClick={() => setSigner(null)}
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
