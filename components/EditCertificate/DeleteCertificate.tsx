import { Button, Column, Container, Row, Text } from "@adev/ui-kit";
import { kBaseEndpoint } from "@common/app";
import { Certificate } from "@common/certificate";
import axios from "axios";
import { FC } from "react";

interface DeleteCertificateProps {
  /**
   *      _____
   *     /  |  \
   *     |     |     My dick
   *     |     |     is BIG ;)
   *     |     |
   *     |     |
   *     |     |
   *   __|     |__
   *  /           \
   * |     ___     |
   *  \___/   \___/
   *
   */
  certificate: Certificate;
  onClose: () => void;
  onChange: () => void;
}

const deleteCertificate = async (certificateId: string) => {
  if (!certificateId) {
    throw new Error("certificateId is Empty");
  }
  try {
    await axios.delete(
      `${kBaseEndpoint}/certificate/v1/certificate/${certificateId}`
    );
  } catch (error: any) {
    throw error;
  }
};

const DeleteCertificate: FC<DeleteCertificateProps> = ({
  certificate,
  onClose,
  onChange,
}) => {
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await deleteCertificate(certificate.id);
      onClose();
      onChange();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <Container adaptive>
          <Row adaptive spacing={1}>
            <Column col={12}>
              <Text typography="headline-md" as="h1">
                Удалить справку?
              </Text>
            </Column>

            <Column col={12}>
              <Button type="submit" view="action" width="available">
                Удалить
              </Button>
            </Column>
          </Row>
        </Container>
      </form>
    </>
  );
};

export default DeleteCertificate;
