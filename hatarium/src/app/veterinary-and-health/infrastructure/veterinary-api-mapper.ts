import { Appointment } from '../domain/model/appointment.entity';
import { MedicalRecord } from '../domain/model/medical-record.entity';
import { Treatment } from '../domain/model/treatment.entity';
import { AppointmentResource, MedicalRecordResource, TreatmentResource } from './veterinary-response';

export class VeterinaryApiMapper {
  /** IAM user ids arrive as numbers; the domain compares them as text. */
  public static toIdText(id: number | string | null | undefined): string {
    return id === null || id === undefined ? '' : String(id);
  }

  /** The backend validates IAM user ids as numbers (Long). */
  public static toIdNumber(id: number | string | null | undefined): number | null {
    if (id === null || id === undefined || id === '') return null;
    const value = Number(id);
    return Number.isInteger(value) ? value : null;
  }

  public static toAppointmentEntity(resource: AppointmentResource): Appointment {
    const entity = new Appointment();
    entity.id = resource.id;
    entity.rancherId = VeterinaryApiMapper.toIdText(resource.rancherId);
    entity.veterinarianId = VeterinaryApiMapper.toIdText(resource.veterinarianId);
    entity.requestedBy = VeterinaryApiMapper.toIdText(resource.requestedBy);
    entity.origin = resource.origin ?? 'RANCHER_REQUEST';
    entity.scheduledAt = resource.scheduledAt;
    entity.reason = resource.reason;
    entity.status = resource.status;
    entity.cancellationReason = resource.cancellationReason || '';
    entity.createdAt = resource.createdAt || '';
    return entity;
  }

  public static toMedicalRecordEntity(resource: MedicalRecordResource): MedicalRecord {
    const entity = new MedicalRecord();
    entity.id = resource.id;
    entity.appointmentId = resource.appointmentId || '';
    entity.animalId = resource.animalId;
    entity.veterinarianId = VeterinaryApiMapper.toIdText(resource.veterinarianId);
    entity.recordedAt = resource.recordedAt;
    entity.symptoms = resource.symptoms;
    entity.diagnosis = resource.diagnosis;
    entity.severity = resource.severity;
    entity.healthStatus = resource.healthStatus;
    entity.notes = resource.notes || '';
    return entity;
  }

  public static toTreatmentEntity(resource: TreatmentResource): Treatment {
    const entity = new Treatment();
    entity.id = resource.id;
    entity.medicalRecordId = resource.medicalRecordId;
    entity.animalId = resource.animalId;
    entity.medicationId = resource.medicationId;
    entity.treatmentType = resource.treatmentType;
    entity.dose = Number.parseFloat(String(resource.dose)) || 0;
    entity.doseUnit = resource.doseUnit;
    entity.route = resource.route;
    entity.frequencyHours = Number(resource.frequencyHours) || 0;
    entity.durationDays = resource.durationDays;
    entity.scheduledAt = resource.scheduledAt;
    entity.administeredAt = resource.administeredAt || '';
    entity.nextDate = resource.nextDate || resource.nextDueAt || '';
    entity.status = resource.status;
    entity.instructions = resource.instructions || '';
    return entity;
  }
}
