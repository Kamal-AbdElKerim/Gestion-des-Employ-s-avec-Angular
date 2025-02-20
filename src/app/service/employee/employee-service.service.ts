import { Injectable } from '@angular/core';
import { Employee } from '../../interface/Employee';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly localStorageKey = 'employees';
  private employees: Employee[] = [];
  private employeesSubject: BehaviorSubject<Employee[]>;
  employee?: Employee;

  constructor() {
    const storedEmployees = localStorage.getItem(this.localStorageKey);
    this.employees = storedEmployees ? JSON.parse(storedEmployees) : [];
    this.employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  }

  /**
   * Récupérer la liste des employés sous forme d'Observable.
   */
  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable().pipe(
      map((employees: Employee[]) => employees),
      catchError((error: any) => {
        console.error('Erreur lors de la récupération des employés :', error);
        return throwError(() => new Error('Erreur lors de la récupération des employés.'));
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return new Observable<Employee | undefined>((observer) => {
      try {
        const employee = this.employees.find((emp) => emp.id === id);
        if (employee) {
          observer.next(employee);
          observer.complete();
        } else {
          observer.error(`Employé avec l'ID ${id} introuvable.`);
        }
      } catch (error) {
        console.error('Erreur lors de la recherche de lemployé :', error);
        observer.error('Impossible de rechercher lemployé.');
      }
    });
  }

  /**
   * Ajouter un employé.
   */
  addEmployee(employee: Employee): Observable<Employee[]> {
    return new Observable<Employee[]>(observer => {
      try {
        employee.id = this.generateId();
        employee.Date = new Date()
        this.employees.unshift(employee);
        this.updateLocalStorage();
        observer.next([...this.employees]);
        observer.complete();
      } catch (error) {
        console.error('Erreur lors de lajout de lemployé :', error);
        observer.error('Impossible dajouter lemployé.');
      }
    });
  }

  /**
   * Modifier un employé existant.
   */
  updateEmployee(id: number, updatedEmployee: Employee): Observable<Employee[]> {
    return new Observable<Employee[]>(observer => {
      try {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
          this.employees[index] = { ...updatedEmployee, id }; // Conserver l'ID existant
          this.updateLocalStorage();
          observer.next([...this.employees]); // Émettre la liste mise à jour
          observer.complete();
        } else {
          observer.error('Employé introuvable.');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de lemployé :', error);
        observer.error('Impossible de modifier lemployé.');
      }
    });
  }

  /**
   * Supprimer un employé.
   */
  deleteEmployee(id: number): Observable<Employee[]> {
    return new Observable<Employee[]>(observer => {
      try {
        this.employees = this.employees.filter(emp => emp.id !== id);
        this.updateLocalStorage();
        observer.next([...this.employees]); // Émettre la liste après suppression
        observer.complete();
      } catch (error) {
        console.error('Erreur lors de la suppression de lemployé :', error);
        observer.error('Impossible de supprimer lemployé.');
      }
    });
  }

  /**
   * Générer un nouvel ID unique pour un employé.
   */
  private generateId(): number {
    return this.employees.length > 0 ? Math.max(...this.employees.map(emp => emp.id)) + 1 : 1;
  }

  /**
   * Mettre à jour les données dans localStorage et notifier les abonnés.
   */
  private updateLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.employees));
    this.employeesSubject.next([...this.employees]); // Mise à jour réactive
  }
}
