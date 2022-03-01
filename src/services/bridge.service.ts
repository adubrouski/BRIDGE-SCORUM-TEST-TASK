import { validateHttpResponse } from "middleware/validate-http-response.middleware";
import { imageToDataUrl } from "utils/utils";
import { ResponseCardEntity } from "types/card.entity";

export default class BridgeService {
  private static readonly CARDS_VALUES = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  static async getWinner() {
    return fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=2", {
      method: "GET",
    })
      .then(validateHttpResponse)
      .then(async (response: { cards: ResponseCardEntity[] }) => {
        const imagesCallbacks = response.cards.map((card) =>
          imageToDataUrl(card.image)
        );
        const base64Images = await Promise.all(imagesCallbacks);

        return response.cards.map((card, index) => ({
          isHidden: false,
          value: BridgeService.CARDS_VALUES.findIndex(
            (value) => value === card.value
          ),
          image: base64Images[index],
        }));
      })
      .catch((error) => {
        throw error;
      });
  }
}
