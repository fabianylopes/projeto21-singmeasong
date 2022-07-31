import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationsFactory,createRecommendations } from "../factories/recommendationFactory.js";

describe('recommendation unit tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should throw a conflict error after insert a duplicate name', async () => {   
        const recommendation = recommendationsFactory()[0];
      
        jest
        .spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce((): any => {
            return recommendation;
        });
    
        const response = recommendationService.insert(recommendation);

        expect(response).rejects.toEqual({
            message: "Recommendations names must be unique",
            type: "conflict",
        });
    });

    it('should throw a not found error if recommendation does not exist', async () => {   
        jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

        expect(recommendationService.upvote(0)).rejects.toEqual({
            type: "not_found",
            message: "",
        });
    });

    it('should throw a not found error if recommendation does not exist', async () => {   
        jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

        expect(recommendationService.downvote(0)).rejects.toEqual({
            type: "not_found",
            message: "",
        });
    });

    it('should remove a recommendation if score less than -5', async () => {   
        const recommendation = {
            id: 1,
            name: "Falamansa - Xote dos Milagres",
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
            score: -5,
          };
      
          jest.spyOn(recommendationRepository, "find").mockResolvedValue(recommendation);
          jest.spyOn(recommendationRepository, "updateScore").mockResolvedValue({ ...recommendation, score: -6 });     
          jest.spyOn(recommendationRepository, "remove").mockResolvedValue();
      
          await recommendationService.downvote(recommendation.id);
          expect(recommendationRepository.remove).toBeCalled();
        
    });

    it('should throw a not found error if id does not exist', async () => {  
        jest.spyOn(recommendationRepository, 'find').mockResolvedValueOnce(undefined);

        expect(recommendationService.getById(0)).rejects.toEqual({
            message: '',
            type: 'not_found',
        });
    });
});
