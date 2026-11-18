/**
 * ident: client.components.kniga.view.autodev-dashboard
 * category: view
 * purpose: render
 * role: view
 * semantic: progress-and-history
 * universe: kniga
 */

import { Check, ChevronRight, CircleAlert, Clock3, ExternalLink, History, Wrench } from "lucide-react";
import { createAtlasAutoDevTool, type AutoDevRole, type AutoDevWorkItem } from "@/components/kniga/structure/autodev-tool";
import type { AutoDevHistoryRecord } from "@/components/kniga/structure/autodev-history";

type Locale = "en" | "ru";

const copy: Record<Locale, {
  eyebrow: string; title: string; intro: string; progress: string; history: string; traceability: string;
  done: string; ready: string; blocked: string; total: string; evidence: string; registry: string; roadmap: string;
  noHistory: string; browserStored: string; architect: string; developer: string; operator: string; all: string;
}> = {
  en: { eyebrow: "AUTODEV CONTROL ROOM", title: "Make delivery state visible.", intro: "A repeatable work surface for the Architect, Developer, and Operator roles. Progress, evidence, and source traceability stay connected to the atlas model.", progress: "ROLE PROGRESS", history: "PERSISTENT EXECUTION HISTORY", traceability: "TRACEABILITY", done: "done", ready: "ready", blocked: "blocked", total: "items", evidence: "Evidence", registry: "Registry", roadmap: "Roadmap", noHistory: "No execution evidence recorded yet.", browserStored: "Stored in this browser", architect: "Architect", developer: "Developer", operator: "Operator", all: "All roles" },
  ru: { eyebrow: "КОНТРОЛЬНАЯ КОМНАТА AUTODEV", title: "Сделайте состояние поставки видимым.", intro: "Повторяемая рабочая поверхность для ролей Архитектора, Разработчика и Оператора. Прогресс, доказательства и трассировка источников связаны с моделью атласа.", progress: "ПРОГРЕСС ПО РОЛЯМ", history: "СОХРАНЁННАЯ ИСТОРИЯ ВЫПОЛНЕНИЯ", traceability: "ТРАССИРУЕМОСТЬ", done: "готово", ready: "готово к работе", blocked: "заблокировано", total: "задач", evidence: "Доказательство", registry: "Реестр", roadmap: "Дорожная карта", noHistory: "Доказательства выполнения ещё не записаны.", browserStored: "Хранится в этом браузере", architect: "Архитектор", developer: "Разработчик", operator: "Оператор", all: "Все роли" },
};

const roleLabel = (locale: Locale, role: AutoDevRole) => copy[locale][role];

export function AutoDevDashboard({ locale, items, history }: { locale: Locale; items: readonly AutoDevWorkItem[]; history: readonly AutoDevHistoryRecord[] }) {
  const text = copy[locale];
  const tool = createAtlasAutoDevTool({ items });
  const allMetric = tool.measure().value;
  const roles: AutoDevRole[] = ["architect", "developer", "operator"];

  return (
    <section className="section-block autodev-section" id="autodev">
      <div className="section-heading"><div className="section-marker"><span>17</span><span className="marker-line" /></div><div><div className="eyebrow">{text.eyebrow}</div><h2>{text.title}</h2><p className="section-intro">{text.intro}</p></div></div>
      <div className="autodev-board">
        <div className="autodev-board-top"><div><span className="eyebrow">{text.progress}</span><h3>{allMetric.done}/{allMetric.total} {text.done} · {allMetric.completionPercent}%</h3></div><span className="info-pill"><Wrench size={14} /> {text.all}</span></div>
        <div className="autodev-role-grid">
          {roles.map((role) => {
            const roleMetric = tool.measure(role).value;
            return <article className={`autodev-role-card autodev-role-${role}`} key={role}><div className="autodev-role-head"><span className="autodev-role-mark">{role.slice(0, 1).toUpperCase()}</span><div><strong>{roleLabel(locale, role)}</strong><small>{roleMetric.total} {text.total}</small></div><span className="autodev-role-percent">{roleMetric.completionPercent}%</span></div><div className="autodev-progress"><span style={{ width: `${roleMetric.completionPercent}%` }} /></div><div className="autodev-role-stats"><span><Check size={13} /> {roleMetric.done} {text.done}</span><span><Clock3 size={13} /> {roleMetric.ready} {text.ready}</span><span><CircleAlert size={13} /> {roleMetric.blocked} {text.blocked}</span></div></article>;
          })}
        </div>
        <div className="autodev-history"><div className="autodev-subhead"><div><span className="eyebrow">{text.history}</span><h3><History size={17} /> {history.length} {text.evidence}</h3></div><span className="info-pill">{text.browserStored}</span></div>{history.length === 0 ? <p className="autodev-empty">{text.noHistory}</p> : <div className="autodev-history-list">{history.map((record) => <article className="autodev-history-item" key={record.id}><div className="autodev-history-status"><Check size={14} /></div><div className="autodev-history-copy"><strong>{record.workItemTitle}</strong><span>{roleLabel(locale, record.role)} · {new Date(record.recordedAt).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US")}</span><small>{record.summary}</small>{record.command && <code>{record.command}</code>}</div></article>)}</div>}</div>
        <div className="autodev-trace"><div className="autodev-subhead"><div><span className="eyebrow">{text.traceability}</span><h3>{locale === "ru" ? "Рабочая задача → записи атласа" : "Work item → atlas records"}</h3></div></div><div className="autodev-trace-list">{items.map((item) => <article className="autodev-trace-item" key={item.id}><div><strong>{item.id}</strong><span>{item.title}</span></div><div className="autodev-trace-links"><span>{text.registry}: {item.registryIds.map((id) => <a href="#registry" key={id} title={locale === "ru" ? `Открыть ${id} в реестре` : `Open ${id} in registry`}>{id}<ExternalLink size={11} /></a>)}</span><span>{text.roadmap}: {item.roadmapIds.map((id) => <a href="#autodev" key={id} title={locale === "ru" ? `Запись дорожной карты ${id}` : `Roadmap record ${id}`}>{id}<ChevronRight size={11} /></a>)}</span></div></article>)}</div></div>
      </div>
    </section>
  );
}
