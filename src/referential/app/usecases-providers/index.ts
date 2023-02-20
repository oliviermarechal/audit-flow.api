import { Provider } from '@nestjs/common';
import { FetchCriteriaForVersionUsecaseProvider } from './fetch-criteria-for-version-usecase.provider';
import { CreateReferentialUsecaseProvider } from './create-referential-usecase.provider';
import { AddReferentialVersionUsecaseProvider } from './add-referential-version-usecase.provider';
import { ListReferentialUsecaseProvider } from './list-referential-usecase.provider';
import { PublishVersionUsecaseProvider } from './publish-version-usecase.provider';
import { UpdateVersionUsecaseProvider } from './update-version-usecase.provider';
import { UpdateReferentialUsecaseProvider } from './update-referential-usecase.provider';
import { ListCriteriaUsecaseProvider } from './list-criteria-usecase.provider';
import { CreateCriteriaUsecaseProvider } from './create-criteria-usecase.provider';
import { UpdateCriteriaUsecaseProvider } from './update-criteria-usecase.provider';
import { RemoveCriteriaUsecaseProvider } from './remove-criteria-usecase.provider';

export const UsecasesProviders: Provider[] = [
    FetchCriteriaForVersionUsecaseProvider,
    CreateReferentialUsecaseProvider,
    AddReferentialVersionUsecaseProvider,
    ListReferentialUsecaseProvider,
    PublishVersionUsecaseProvider,
    UpdateVersionUsecaseProvider,
    UpdateReferentialUsecaseProvider,
    ListCriteriaUsecaseProvider,
    CreateCriteriaUsecaseProvider,
    UpdateCriteriaUsecaseProvider,
    RemoveCriteriaUsecaseProvider,
];
