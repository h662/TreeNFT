import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { ethers, JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import TreeTokenABI from "@/abis/TreeNFTABI.json";
import Main from "./components/Main";
import { Button, Flex, Text } from "@chakra-ui/react";
import Logo from "./components/Logo";

function App() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [fruitTokenContract, setFruitTokenContract] = useState<Contract | null>(
    null
  );
  const [treeNFTContract, setTreeNFTContract] = useState<Contract | null>(null);

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
  const disconnectWallet = () => setSigner(null);

  useEffect(() => {
    if (!signer) return;

    setFruitTokenContract(
      new ethers.Contract(
        import.meta.env.VITE_FRUIT_TOKEN,
        TreeTokenABI,
        signer
      )
    );
    setTreeNFTContract(
      new ethers.Contract(import.meta.env.VITE_TREE_NFT, TreeTokenABI, signer)
    );
  }, [signer]);

  if (!signer) {
    return (
      <Flex
        flexDirection="column"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Flex alignItems="center" fontSize="4xl">
          <Logo fontSize="4xl" />는 메타마스크 로그인 후 이용할 수 있습니다.
        </Flex>
        <Button colorPalette="green" onClick={connectWallet}>
          로그인
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <Header
        signer={signer}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />
      <Main treeNFTContract={treeNFTContract} />
    </>
  );
}

export default App;
