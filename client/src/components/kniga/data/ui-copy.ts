/**
 * ident: client.components.kniga.data.ui-copy
 * category: data
 * purpose: localize
 * role: product-copy
 * semantic: interface-language
 * universe: kniga
 */

export type AtlasUiLocale = "en" | "ru";

export type AtlasUiCopy = {
  save: string;
  share: string;
  copied: string;
  language: string;
  atlasTitle: string;
  heroKicker: string;
  contents: string;
  interactiveNote: string;
  lastFramed: string;
  toggleNavigation: string;
  nav: Record<string, string>;
  searchConcept: string;
  searchRegistry: string;
  clearRegistrySearch: string;
  reset: string;
  matchingRows: string;
  sortHint: string;
  downloadSuccess: string;
  shareSheetOpened: string;
  pageLinkCopied: string;
  sharingCancelled: string;
  chooseFileFirst: string;
  artifactSaved: string;
  uploadFailed: string;
  artifactRemoved: string;
  deleteFailed: string;
};

export const atlasUiCopy: Record<AtlasUiLocale, AtlasUiCopy> = {
  en: {
    save: "Save atlas", share: "Share", copied: "Copied", language: "Language", atlasTitle: "Architecture Models Atlas", heroKicker: "A visual guide to architecture description", contents: "Contents", interactiveNote: "Interactive research note", lastFramed: "Last framed · 2022 edition", toggleNavigation: "Toggle navigation", searchConcept: "Find a concept…", searchRegistry: "Search names, questions, artifacts, tags…", clearRegistrySearch: "Clear registry search", reset: "Reset", matchingRows: "matching rows", sortHint: "Sort any column · press Enter on a row to inspect", downloadSuccess: "Atlas data downloaded", shareSheetOpened: "Share sheet opened", pageLinkCopied: "Page link copied", sharingCancelled: "Sharing was cancelled", chooseFileFirst: "Choose a file and add a title first", artifactSaved: "Artifact saved to your private shelf", uploadFailed: "Upload failed", artifactRemoved: "Artifact removed from the shelf", deleteFailed: "Delete failed",
    nav: { top: "Overview", context: "Context", core: "Core model", c4: "C4 lens", mof: "MOF lens", mda: "MDA", togaf: "TOGAF", archimate: "ArchiMate", dragon1: "Dragon1", "model-theory": "Roles + theory", metamodel: "Metamodel", registry: "Registry", mapping: "Compare", changes: "Edition shifts", sources: "Sources", storage: "File Storage", autodev: "AutoDev" },
  },
  ru: {
    save: "Сохранить атлас", share: "Поделиться", copied: "Скопировано", language: "Язык", atlasTitle: "Атлас архитектурных моделей", heroKicker: "Визуальный путеводитель по описанию архитектуры", contents: "Содержание", interactiveNote: "Интерактивная исследовательская заметка", lastFramed: "Последняя рамка · редакция 2022", toggleNavigation: "Открыть навигацию", searchConcept: "Найти концепт…", searchRegistry: "Поиск по названиям, вопросам, артефактам, тегам…", clearRegistrySearch: "Очистить поиск реестра", reset: "Сбросить", matchingRows: "совпадающих строк", sortHint: "Сортировка по столбцу · Enter открывает строку", downloadSuccess: "Данные атласа скачаны", shareSheetOpened: "Открыто меню публикации", pageLinkCopied: "Ссылка на страницу скопирована", sharingCancelled: "Публикация отменена", chooseFileFirst: "Сначала выберите файл и добавьте название", artifactSaved: "Артефакт сохранён на вашей полке", uploadFailed: "Не удалось загрузить файл", artifactRemoved: "Артефакт удалён с полки", deleteFailed: "Не удалось удалить артефакт",
    nav: { top: "Обзор", context: "Контекст", core: "Ядро модели", c4: "Линза C4", mof: "Линза MOF", mda: "MDA", togaf: "TOGAF", archimate: "ArchiMate", dragon1: "Dragon1", "model-theory": "Роли и теория", metamodel: "Метамодель", registry: "Реестр", mapping: "Сравнение", changes: "Изменения редакций", sources: "Источники", storage: "Файловое хранилище", autodev: "AutoDev" },
  },
};
