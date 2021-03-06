//@ts-ignore
import keymirror from 'keymirror';
export const Events = keymirror({
  //on-boarding
  ApiCreated: null,
  ApiInitializedInProject: null,
  ApiCheckCompleted: null,

  //Errors
  JavascriptErrorDetectedInFrontend: null,
  RequirementForDiffsToHaveASuggestionFailed: null,

  //running tasks
  StartedTaskWithLocalCli: null,
  ExitedTaskWithLocalCli: null,

  //diffs
  BodyDiffRendered: null,
  UserChangedCaptureOverviewTab: null,
  UserEnabledInferPolymorphism: null,
  UserBeganAddingNewUrl: null,
  UserFinishedAddingNewUrl: null,
  UserResetDiff: null,
  ShowInitialDocumentingView: null,
  UpdateContribution: null,
  AddUrlModalNaming: null,
  AddUrlModalIdentifyingPathComponents: null,
  ShowCommitCard: null,
  UserPreviewedSuggestion: null,
  UserAcceptedSuggestion: null,
  SuggestionDisplayed: null,
  UserCommittedChanges: null,
});
