import { Button, Flex, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useState } from "react";
import SuccessDialog from "./SuccessDialog";
import { containerStyle } from "./Main";

interface CreateNFTProps {
  treeNFTContract: Contract | null;
}

function CreateNFT({ treeNFTContract }: CreateNFTProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMintNFT = async () => {
    if (!treeNFTContract) return;

    setIsLoading(true);

    try {
      const tx = await treeNFTContract.mintNFT();

      await tx.wait();

      setIsOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex {...containerStyle}>
        <Text
          bgGradient="to-r"
          gradientFrom="green.200"
          gradientTo="blue.200"
          fontSize={["2xl", "3xl", "4xl", "5xl"]}
          fontWeight="semibold"
          px={8}
          py={2}
          rounded="md"
        >
          자연을 지켜주세요!
        </Text>
        <Button
          colorPalette="green"
          variant="outline"
          onClick={handleMintNFT}
          loading={isLoading}
          loadingText="로딩중"
        >
          민팅
        </Button>
      </Flex>
      <SuccessDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="민팅"
        message="민팅에 성공했습니다."
      />
    </>
  );
}

export default CreateNFT;
