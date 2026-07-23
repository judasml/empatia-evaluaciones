import { Avatar } from "@/components/design-system/avatar";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";
import type {
  CoverageSource,
  SubjectCoverage,
} from "@/lib/admin-dashboard-data";

function isSourceReady(source: CoverageSource) {
  return source.received >= source.expected;
}

function isSubjectReady(subject: SubjectCoverage) {
  return (
    isSourceReady(subject.boss) &&
    isSourceReady(subject.peer) &&
    isSourceReady(subject.team)
  );
}

function CoverageCell({ source }: { source: CoverageSource }) {
  const protectedByThreshold = source.anonymous && source.received < 3;

  return (
    <span className="coverage-value">
      <span>
        {source.received}/{source.expected}
      </span>
      {protectedByThreshold ? (
        <span
          className="coverage-lock"
          title="Se necesitan al menos 3 respuestas para mostrar resultados de esta fuente."
        >
          <Icon name="lock" size={14} />
          <span className="sr-only">Resultado protegido por anonimato</span>
        </span>
      ) : null}
    </span>
  );
}

export function CoverageTable({ subjects }: { subjects: SubjectCoverage[] }) {
  const readyCount = subjects.filter(isSubjectReady).length;

  return (
    <Card padding="none" className="admin-panel admin-coverage" id="coverage">
      <div className="admin-panel__heading">
        <span className="admin-panel__icon">
          <Icon name="shield" size={22} />
        </span>
        <div>
          <h2>Cobertura por evaluado</h2>
          <p>
            Respuestas recibidas / esperadas. El candado protege grupos con
            menos de 3 respuestas.
          </p>
        </div>
        <span className="admin-panel__count">{readyCount} listos</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Evaluado</th>
              <th>Jefatura</th>
              <th>Pares</th>
              <th>Equipo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => {
              const ready = isSubjectReady(subject);
              return (
                <tr key={subject.id}>
                  <td>
                    <div className="admin-person">
                      <Avatar
                        name={subject.name}
                        size="sm"
                        status={ready ? "complete" : "pending"}
                      />
                      <span>
                        <strong>{subject.name}</strong>
                        <small>{subject.role}</small>
                      </span>
                    </div>
                  </td>
                  <td>
                    <CoverageCell source={subject.boss} />
                  </td>
                  <td>
                    <CoverageCell source={subject.peer} />
                  </td>
                  <td>
                    <CoverageCell source={subject.team} />
                  </td>
                  <td className="admin-table__status">
                    {ready ? (
                      <span className="admin-ready-state">
                        <Icon name="check" size={15} />
                        Resultados listos
                      </span>
                    ) : (
                      <span>En curso</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
