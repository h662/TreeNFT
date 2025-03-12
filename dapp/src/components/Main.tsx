import { Flex } from "@chakra-ui/react";
import CreateNFT from "./CreateNFT";
import { Contract } from "ethers";

interface MainProps {
  treeNFTContract: Contract | null;
}

function Main({ treeNFTContract }: MainProps) {
  return (
    <Flex as="main" bgColor="yellow.100" p={4}>
      <CreateNFT treeNFTContract={treeNFTContract} />
    </Flex>
  );
}

export default Main;
