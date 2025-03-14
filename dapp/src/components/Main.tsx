import { Flex } from "@chakra-ui/react";
import CreateNFT from "./CreateNFT";
import { Contract } from "ethers";
import NFTList from "./NFTList";
import { JsonRpcSigner } from "ethers";

export const containerStyle = {
  width: 1024,
  mx: "auto",
  bgColor: "purple.100",
  flexDir: "column",
  flexGrow: 1,
  alignItems: "center",
  gap: 2,
};

interface MainProps {
  signer: JsonRpcSigner | null;
  treeNFTContract: Contract | null;
}

function Main({ signer, treeNFTContract }: MainProps) {
  return (
    <Flex as="main" flexDirection="column" bgColor="yellow.100" p={4}>
      <CreateNFT treeNFTContract={treeNFTContract} />
      <NFTList signer={signer} treeNFTContract={treeNFTContract} />
    </Flex>
  );
}

export default Main;
